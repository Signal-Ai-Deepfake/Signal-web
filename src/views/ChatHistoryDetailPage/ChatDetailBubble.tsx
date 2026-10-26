import BotOutline from "@/shared/asset/svg/BotOutline";
import type { ChatMessage } from "@/entities/chat/model";

interface ChatDetailBubbleProps {
  message: ChatMessage;
}

export default function ChatDetailBubble({ message }: ChatDetailBubbleProps) {
  if (message.role === "user") {
    return (
      <div className="flex w-full justify-end">
        <div className="bg-primary-500 max-w-[85%] rounded-tl-2xl rounded-tr-[2px] rounded-br-2xl rounded-bl-2xl px-3.5 py-2.5 md:max-w-[80%] md:px-[17px] md:py-[13px]">
          <p className="text-small md:text-body-2 break-words whitespace-pre-wrap text-white">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      <span className="bg-secondary-50 text-secondary-500 flex size-9 shrink-0 items-center justify-center rounded-full md:size-11 [&>svg]:h-5 [&>svg]:w-5 md:[&>svg]:h-6 md:[&>svg]:w-6">
        <BotOutline />
      </span>
      <div className="max-w-[85%] rounded-tl-[2px] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl border border-gray-300 bg-white p-3 md:max-w-[80%] md:p-4">
        <p className="text-small md:text-body-2 break-words whitespace-pre-wrap text-black">
          {message.content}
        </p>
      </div>
    </div>
  );
}
