import { createParser } from 'eventsource-parser';

const TTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stellaris-tts`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

/** Strip markdown so the voice reads naturally. */
export const toSpeakable = (md: string) =>
  md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/[*_~>|]/g, '')
    .replace(/^\s*[-+]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

const decodePCM = (pending: Uint8Array, incoming: Uint8Array) => {
  const bytes = new Uint8Array(pending.length + incoming.length);
  bytes.set(pending);
  bytes.set(incoming, pending.length);
  const usable = bytes.length - (bytes.length % 2);
  const view = new DataView(bytes.buffer);
  const samples = new Float32Array(usable / 2);
  for (let i = 0; i < samples.length; i++) samples[i] = view.getInt16(i * 2, true) / 32768;
  return { samples, pending: bytes.slice(usable) };
};

/** Streams the assistant's voice and resolves when playback finishes. */
export async function speak(text: string, signal?: AbortSignal): Promise<void> {
  signal?.throwIfAborted();
  const context = new AudioContext({ sampleRate: 24000 });
  const sources = new Set<AudioBufferSourceNode>();
  let playhead = 0;
  let pending = new Uint8Array(0);
  let completed = false;
  let samplesPlayed = 0;
  const controller = new AbortController();
  const abort = () => {
    controller.abort(signal?.reason);
    for (const s of sources) s.stop();
  };
  signal?.addEventListener('abort', abort, { once: true });
  let playback: Promise<void> = Promise.resolve();
  try {
    if (context.state === 'suspended') await context.resume();
    const response = await fetch(TTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });
    if (!response.ok || !response.body) {
      const body = await response.text();
      throw new Error(response.status === 402 || /credit/i.test(body) ? 'credits' : `Voice failed (${response.status})`);
    }
    const parser = createParser({
      onEvent(event) {
        const payload = JSON.parse(event.data) as { type: string; audio?: string; error?: unknown };
        if (payload.type === 'error' || payload.error) throw new Error('Voice failed');
        if (payload.type === 'speech.audio.done') {
          completed = true;
          return;
        }
        if (payload.type !== 'speech.audio.delta' || !payload.audio) return;
        const decoded = decodePCM(pending, Uint8Array.from(atob(payload.audio), (c) => c.charCodeAt(0)));
        pending = new Uint8Array(decoded.pending);
        if (!decoded.samples.length) return;
        samplesPlayed += decoded.samples.length;
        const buffer = context.createBuffer(1, decoded.samples.length, 24000);
        buffer.copyToChannel(decoded.samples, 0);
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        sources.add(source);
        playback = new Promise<void>((resolve) => {
          source.onended = () => {
            sources.delete(source);
            resolve();
          };
        });
        playhead = Math.max(playhead, context.currentTime + 0.05);
        source.start(playhead);
        playhead += buffer.duration;
      },
    });
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
    try {
      while (true) {
        const next = await reader.read();
        if (next.done) break;
        parser.feed(next.value);
      }
    } finally {
      reader.releaseLock();
    }
    if (!completed || !samplesPlayed) throw new Error('Incomplete voice transmission');
    await playback;
    signal?.throwIfAborted();
  } finally {
    signal?.removeEventListener('abort', abort);
    controller.abort();
    for (const s of sources) s.stop();
    await context.close();
  }
}

// ---- Speech recognition (browser built-in, free) ----
type Recognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
};

export const getRecognitionCtor = (): (new () => Recognition) | null => {
  const w = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
};

export type { Recognition };
