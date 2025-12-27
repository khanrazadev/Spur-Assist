import { useEffect, useRef, useState } from "react";
import { sendChatMessage } from "../api/chat.api";
import type { ChatMessage, HistoryResponse } from "../types/chat";



const SESSION_TIMEOUT = 30 * 60 * 1000; // 30
const lastActivity = localStorage.getItem("spur_last_activity");

if (
    lastActivity &&
    Date.now() - Number(lastActivity) > SESSION_TIMEOUT
) {
    localStorage.removeItem("spur_session_id");
    localStorage.removeItem("spur_last_activity");
}

export function useChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sessionIdRef = useRef<string | null>(
        localStorage.getItem("spur_session_id")
    );


    useEffect(() => {
        const sessionId = sessionIdRef.current;
        if (!sessionId) {
            setMessages([
                {
                    id: crypto.randomUUID(),
                    sender: "ai",
                    text: "Hey 👋 How can we help you today?",
                },
            ]);
            return;
        }


        fetch(
            `http://localhost:3000/api/chat/history?sessionId=${sessionId}`
        )
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load history");
                return res.json() as Promise<HistoryResponse>;
            })
            .then((data) => {
                if (!Array.isArray(data.messages)) return;

                setMessages(
                    data.messages.map((m) => ({
                        id: crypto.randomUUID(),
                        sender: m.sender,
                        text: m.text,
                    }))
                );
            })
            .catch(() => {
                // intentionally silent
                // chat still works even if history fails
            });
    }, []);
   

    async function sendMessage(text: string) {
        if (!text.trim() || loading) return;

        setError(null);

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            sender: "user",
            text,
        };

        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            const res = await sendChatMessage(
                text,
                sessionIdRef.current ?? undefined
            );

            sessionIdRef.current = res.sessionId;
            localStorage.setItem("spur_session_id", res.sessionId);

            const aiMessage: ChatMessage = {
                id: crypto.randomUUID(),
                sender: "ai",
                text: res.reply,
            };

            setMessages((prev) => [...prev, aiMessage]);
            localStorage.setItem(
                "spur_last_activity",
                Date.now().toString()
            );

        } catch (e) {
            setError(
                e instanceof Error
                    ? e.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return {
        messages,
        sendMessage,
        loading,
        error,
    };
}
