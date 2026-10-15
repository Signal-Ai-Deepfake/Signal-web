import BotFilled from "@/shared/asset/svg/BotFilled";
import BotOutline from "@/shared/asset/svg/BotOutline";
import ChatMarkdown, { parseChatMarkdown } from "./ChatMarkdown";
import TypingText from "./TypingText";
import type { ChatMessage } from "./types";

interface ChatMessageBubbleProps {
  message: ChatMessage;
  pending?: boolean;
  onTyping?: () => void;
}

function formatTime(timestamp?: number) {
  if (!timestamp) return null;
  return new Date(timestamp).toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" });
}

export default function ChatMessageBubble({ message, pending, onTyping }: ChatMessageBubbleProps) {
  const time = formatTime(message.createdAt);
  const timeLabel = time && (
    <p className="text-caption text-gray-800 opacity-60 md:hidden">{time}</p>
  );

  if (message.role === "user") {
    return (
      <div className="flex w-full flex-col items-end gap-2">
        <div className="bg-primary-500 max-w-[80%] rounded-2xl rounded-tr-none px-4 py-3.5 shadow-sm md:rounded-tr-[2px] md:px-[17px] md:py-[13px] md:shadow-none">
          <p className="text-body-2 break-words whitespace-pre-wrap text-white">
            {message.content}
          </p>
        </div>
        {timeLabel}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 md:gap-2">
      <span className="border-secondary-400 bg-secondary-50 text-secondary-400 md:text-secondary-500 flex size-10 shrink-0 items-center justify-center rounded-full border md:size-11 md:border-0">
        <span className="md:hidden [&>svg]:h-4 [&>svg]:w-5">
          <BotFilled />
        </span>
        <span className="hidden md:inline [&>svg]:h-6 [&>svg]:w-6">
          <BotOutline />
        </span>
      </span>
      <div className="flex max-w-[80%] flex-col items-start gap-2">
        <div className="max-md:border-secondary-400/30 max-md:bg-secondary-50 rounded-2xl rounded-tl-none border p-4 max-md:shadow-sm md:rounded-tl-[2px] md:border-gray-300 md:bg-white">
          {pending ? (
            <span
              role="status"
              aria-label="답변 작성 중"
              className="flex h-6 items-center gap-1.5 px-1"
            >
              <span className="bg-secondary-500 size-2 animate-bounce rounded-full [animation-delay:-0.3s]" />
              <span className="bg-secondary-500 size-2 animate-bounce rounded-full [animation-delay:-0.15s]" />
              <span className="bg-secondary-500 size-2 animate-bounce rounded-full" />
            </span>
          ) : (
            <div className="text-body-2 break-words text-black">
              {message.typing ? (
                <TypingText text={message.content} onProgress={onTyping} />
              ) : (
                <ChatMarkdown blocks={parseChatMarkdown(message.content)} />
              )}
            </div>
          )}
        </div>
        {timeLabel}
      </div>
    </div>
  );
}
