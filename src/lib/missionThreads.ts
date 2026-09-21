import type { UIMessage } from "ai";

export type MissionThread = {
  id: string;
  title: string;
  updatedAt: number;
  messages: UIMessage[];
};

const STORAGE_KEY = "stellaris-mission-threads-v1";

const hasWindow = () => typeof window !== "undefined";

export const createThreadId = () =>
  `mission-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const loadThreads = (): MissionThread[] => {
  if (!hasWindow()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((t): t is MissionThread => !!t && typeof t.id === "string")
      .map((t) => ({
        id: t.id,
        title: typeof t.title === "string" ? t.title : "New mission briefing",
        updatedAt: typeof t.updatedAt === "number" ? t.updatedAt : Date.now(),
        messages: Array.isArray(t.messages) ? t.messages : [],
      }))
      .sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
};

export const saveThreads = (threads: MissionThread[]) => {
  if (!hasWindow()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
  } catch {
    // storage full or unavailable — chat still works for this session
  }
};

export const newThread = (): MissionThread => ({
  id: createThreadId(),
  title: "New mission briefing",
  updatedAt: Date.now(),
  messages: [],
});

export const messageText = (message: UIMessage): string =>
  (message.parts ?? [])
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join(" ")
    .trim();

export const titleFromMessages = (messages: UIMessage[]): string | null => {
  const firstUser = messages.find((m) => m.role === "user");
  if (!firstUser) return null;
  const text = messageText(firstUser);
  if (!text) return null;
  return text.length > 46 ? `${text.slice(0, 46)}…` : text;
};
