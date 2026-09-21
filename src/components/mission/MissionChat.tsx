import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { Radar, AlertTriangle, ExternalLink } from 'lucide-react';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
  type PromptInputMessage,
} from '@/components/ai-elements/prompt-input';
import { Shimmer } from '@/components/ai-elements/shimmer';
import missionOfficer from '@/assets/mission-officer.png';
import { Button } from '@/components/ui/button';
import { TOOL_LINKS } from '@/lib/toolLinks';
import { createTimePortalEffect } from '@/utils/timeEffects';

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stellaris-chat`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const SUGGESTIONS = [
  'Plan a crewed mission to Europa',
  'Best early tech priorities for a wide empire?',
  'How do I choose a habitable exoplanet to settle?',
];

const isCreditFallbackError = (message: string) =>
  /credit|402|billing|quota|limit|payment required|community/i.test(message);

type MissionChatProps = {
  threadId: string;
  initialMessages: UIMessage[];
  onMessagesChange: (threadId: string, messages: UIMessage[]) => void;
  compact?: boolean;
};

const MissionChat: React.FC<MissionChatProps> = ({
  threadId,
  initialMessages,
  onMessagesChange,
}) => {
  const composerRef = useRef<HTMLDivElement | null>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: CHAT_URL,
        headers: {
          apikey: ANON_KEY,
          Authorization: `Bearer ${ANON_KEY}`,
        },
      }),
    [],
  );

  const { messages, sendMessage, status, error, stop } = useChat({
    id: threadId,
    messages: initialMessages,
    transport,
  });

  useEffect(() => {
    onMessagesChange(threadId, messages);
  }, [messages, status, threadId, onMessagesChange]);

  const focusInput = useCallback(() => {
    composerRef.current?.querySelector('textarea')?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    focusInput();
  }, [threadId, focusInput]);

  useEffect(() => {
    if (status === 'ready') focusInput();
  }, [status, focusInput]);

  const busy = status === 'submitted' || status === 'streaming';
  const errorMessage = error?.message || 'please try again in a moment.';
  const showCreditFallback = error ? isCreditFallbackError(errorMessage) : false;

  const handleSubmit = useCallback(
    (message: PromptInputMessage) => {
      const text = message.text?.trim();
      if (!text || busy) return;
      sendMessage({ text });
      focusInput();
    },
    [sendMessage, busy, focusInput],
  );

  const sendSuggestion = (text: string) => {
    if (busy) return;
    sendMessage({ text });
    focusInput();
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <Conversation className="flex-1 min-h-0">
        <ConversationContent className="gap-4">
          {messages.length === 0 ? (
            <ConversationEmptyState>
              <img
                src={missionOfficer}
                alt="Stellaris mission guidance officer"
                loading="lazy"
                width={816}
                height={816}
                className="w-20 h-20 rounded-full object-cover ring-2 ring-space-blue/60 shadow-[0_0_30px_rgba(56,189,248,0.4)]"
              />
              <h3 className="font-semibold text-white">Mission Control online</h3>
              <p className="text-sm text-gray-400 max-w-sm">
                Ask about launch windows, colony sites, fleet builds or galactic strategy.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => sendSuggestion(s)}
                    className="text-xs px-3 py-2 rounded-full border border-space-blue/40 text-gray-300 hover:text-white hover:bg-space-blue/20 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </ConversationEmptyState>
          ) : (
            messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {message.parts.map((part, index) =>
                    part.type === 'text' ? (
                      <MessageResponse key={`${message.id}-${index}`}>
                        {part.text}
                      </MessageResponse>
                    ) : null,
                  )}
                </MessageContent>
              </Message>
            ))
          )}

          {status === 'submitted' && (
            <Message from="assistant">
              <MessageContent>
                <Shimmer className="text-sm">Plotting trajectory...</Shimmer>
              </MessageContent>
            </Message>
          )}

          {error && (
            <div className="flex items-start gap-2 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <div className="space-y-3">
                <span>
                  Transmission failed: {showCreditFallback
                    ? 'Sorry, community credits have run out for today. Please try the ChatGPT version while the in-site Mission Control refuels.'
                    : errorMessage}
                </span>
                {showCreditFallback && (
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => createTimePortalEffect(TOOL_LINKS.stellarisChatGpt.url, TOOL_LINKS.stellarisChatGpt.voice)}
                    className="rounded-full"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open {TOOL_LINKS.stellarisChatGpt.shortLabel}
                  </Button>
                )}
              </div>
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="pt-3" ref={composerRef}>
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea
            placeholder="Ask Mission Control anything about space..."
          />
          <PromptInputFooter className="justify-between">
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-gray-400 pl-1">
              <Radar className="w-3.5 h-3.5 text-space-cyan" />
              Simulation guidance only
            </span>
            <PromptInputSubmit
              status={status}
              onStop={stop}
              disabled={status === 'submitted'}
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
};

export default MissionChat;
