import type { ChatMessage } from "./types";

export const INITIAL_MESSAGE_COUNT = 1;

export function createInitialMessages(greeting: string): ChatMessage[] {
  return [{ id: "1", role: "bot", typing: true, content: greeting }];
}
