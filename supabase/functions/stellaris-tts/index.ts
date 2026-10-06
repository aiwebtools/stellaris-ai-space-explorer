const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MODEL = "google/gemini-3.1-flash-tts-preview";
const VOICE = "Aoede";
const STYLE =
  "Say this as a warm, friendly, helpful young woman who is the starship's AI flight assistant, calm and clear with a gentle sense of wonder: ";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const json = (status: number, body: unknown) =>
    new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return json(500, { error: "Voice is not configured yet." });

    const { text } = (await req.json()) as { text?: string };
    const clean = typeof text === "string" ? text.trim().slice(0, 4000) : "";
    if (!clean) return json(400, { error: "Nothing to say." });

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        contents: [{ role: "user", parts: [{ text: STYLE + clean }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE } } },
        },
        stream_format: "sse",
      }),
    });

    if (!upstream.ok) {
      const details = await upstream.text();
      console.error(`TTS failed [${upstream.status}]: ${details}`);
      return json(upstream.status, { error: "Voice transmission failed", status: upstream.status, details });
    }

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        ...corsHeaders,
        "Content-Type": upstream.headers.get("Content-Type") ?? "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("stellaris-tts error", error);
    return json(500, { error: error instanceof Error ? error.message : "Voice failed" });
  }
});
