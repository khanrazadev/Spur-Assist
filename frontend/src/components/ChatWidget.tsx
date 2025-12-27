import { useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { MessageBubble } from "./MessageBubble";
import "../styles/chat.css";

export function ChatWidget() {
  const { messages, sendMessage, loading, error } = useChat();
  const [input, setInput] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function handleSend() {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  }

  return (
    <div className="chat-container">
      <div className="chat-header">Spur Assist</div>
      <div className="messages">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}

        {loading && (
          <div className="bubble ai typing">Spur Assist is typing…</div>
        )}

        <div ref={bottomRef} />
      </div>

      {error && <div className="error">{error}</div>}

      <div className="input-row">
        <input
          value={input}
          placeholder="Type your message…"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}
