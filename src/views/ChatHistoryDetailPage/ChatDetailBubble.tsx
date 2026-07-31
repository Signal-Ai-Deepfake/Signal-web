import BotOutline from "@/shared/asset/svg/BotOutline";
import type { ChatMessage } from "@/entities/chat/model";

interface ChatDetailBubbleProps {
  message: ChatMessage;
}

export default function ChatDetailBubble({ message }: ChatDetailBubbleProps) {
  if (message.role === "user") {
    return (
      <div className="flex w-full justify-end">
        <div className="max-w-[80%] rounded-tl-2xl rounded-tr-[2px] rounded-br-2xl rounded-bl-2xl bg-primary-500 px-[17px] py-[13px]">
          <p className="text-body-2 break-words text-white">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      <span className="bg-secondary-50 text-secondary-500 flex size-11 shrink-0 items-center justify-center rounded-full [&>svg]:h-6 [&>svg]:w-6">
        <BotOutline />
      </span>
      <div className="max-w-[80%] rounded-tl-[2px] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl border border-gray-300 bg-white p-4">
        <p className="text-body-2 break-words text-black">{message.content}</p>
      </div>
    </div>
  );
}
