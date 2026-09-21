import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { Radar, AlertTriangle } from 'lucide-react';
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

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stellaris-chat`;

const SUGGESTIONS = [
  'Plan a crewed mission to Europa',
  'Best early tech priorities for a wide empire?',
  'How do I pick a habitable exoplanet to settle?',
];

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
  compact = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: CHAT_URL,
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string}`,
        },
      }),
    [],
  );

  const { messages, sendMessage, status, error, stop } = useChat({
    id: threadId,
    messages: initialMessages,
    transport,
  });

  // Persist to the visitor's browser whenever the transcript settles or grows.
  useEffect(() => {
    onMessagesChange(threadId, messages);
  }, [messages, status, threadId, onMessagesChange]);

  const focusInput = useCallback(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    focusInput();
  }, [threadId, focusInput]);

  useEffect(() => {
    if (status === 'ready') focusInput();
  }, [status, focusInput]);

  const handleSubmit = useCallback(
    (message: PromptInputMessage) => {
      const text = message.text?.trim();
      if (!text || status === 'submitted' || status === 'streaming') return;
      sendMessage({ text });
      focusInput();
    },
    [sendMessage, status, focusInput],
  );

  const sendSuggestion = (text: string) => {
    if (status === 'submitted' || status === 'streaming') return;
    sendMessage({ text });
    focusInput();
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <Conversation className={compact ? 'flex-1 min-h-0' : 'flex-1 min-h-0'}>
        <ConversationContent className="gap-4">
          {messages.length === 0 ? (
            <ConversationEmptyState
              className="border-none"
              icon={
                <img
                  src={missionOfficer}
                  alt="Stellaris mission guidance officer"
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-space-blue/60 shadow-[0_0_30px_rgba(56,189,248,0.4)]"
                />
              }
              title="Mission Control online"
              description="Ask about launch windows, colony sites, fleet builds or galactic strategy."
            >
              <div className="flex flex-wrap justify-center gap-2 mt-4">
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
                <MessageContent
                  variant={message.role === 'user' ? 'contained' : 'flat'}
                >
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
              <MessageContent variant="flat">
                <Shimmer className="text-sm">Plotting trajectory...</Shimmer>
              </MessageContent>
            </Message>
          )}

          {error && (
            <div className="flex items-start gap-2 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                Transmission failed: {error.message || 'please try again in a moment.'}
              </span>
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="pt-3">
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea
            ref={textareaRef}
            autoFocus
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
