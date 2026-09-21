import { useCallback, useState } from 'react';
import type { UIMessage } from 'ai';
import {
  loadThreads,
  saveThreads,
  newThread,
  titleFromMessages,
  type MissionThread,
} from '@/lib/missionThreads';

// Idempotent bootstrap: read storage once and seed a first thread if empty.
const bootstrap = (): MissionThread[] => {
  if (typeof window === 'undefined') return [];
  const existing = loadThreads();
  if (existing.length > 0) return existing;
  const first = [newThread()];
  saveThreads(first);
  return first;
};

export const useMissionThreads = () => {
  const [threads, setThreads] = useState<MissionThread[]>(bootstrap);

  const persist = useCallback((next: MissionThread[]) => {
    saveThreads(next);
    return next;
  }, []);

  const createThread = useCallback((): MissionThread => {
    const thread = newThread();
    setThreads((prev) => persist([thread, ...prev]));
    return thread;
  }, [persist]);

  const deleteThread = useCallback(
    (id: string) => {
      setThreads((prev) => {
        const remaining = prev.filter((t) => t.id !== id);
        return persist(remaining.length > 0 ? remaining : [newThread()]);
      });
    },
    [persist],
  );

  const updateMessages = useCallback(
    (id: string, messages: UIMessage[]) => {
      setThreads((prev) => {
        const target = prev.find((t) => t.id === id);
        if (!target) {
          if (messages.length === 0) return prev;
          return persist([
            { id, title: titleFromMessages(messages) ?? 'New mission briefing', updatedAt: Date.now(), messages },
            ...prev,
          ]);
        }
        if (
          target.messages.length === messages.length &&
          JSON.stringify(target.messages) === JSON.stringify(messages)
        ) {
          return prev;
        }
        const next = prev.map((t) =>
          t.id === id
            ? {
                ...t,
                messages,
                title:
                  t.title === 'New mission briefing'
                    ? titleFromMessages(messages) ?? t.title
                    : t.title,
                updatedAt: Date.now(),
              }
            : t,
        );
        return persist(next);
      });
    },
    [persist],
  );

  const getThread = useCallback(
    (id: string | undefined) => threads.find((t) => t.id === id),
    [threads],
  );

  return { threads, createThread, deleteThread, updateMessages, getThread };
};
