import type { ChatMessage } from "../types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  message: ChatMessage;
};

export function MessageBubble({ message }: Props) {
  return (
    <div
      className={`bubble ${
        message.sender === "user" ? "user" : "ai"
      }`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {message.text}
      </ReactMarkdown>
    </div>
  );
}
