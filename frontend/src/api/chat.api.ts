import type { ChatResponse, ApiError } from "../types/chat";

const URL = "http://localhost:3000/api/chat/message"

const API_URL =
    import.meta.env.VITE_API_BASE_URL ??
    URL;

export async function sendChatMessage(
    message: string,
    sessionId?: string
): Promise<ChatResponse> {
    let res: Response;

    try {
        res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, sessionId }),
        });
    } catch {
        throw new Error(
            "Unable to reach the server. Please check your connection and try again."
        );
    }

    let data: unknown;
    try {
        data = await res.json();
    } catch {
        throw new Error("Invalid response from server.");
    }

    if (!res.ok) {
        const err = data as ApiError;
        throw new Error(
            err?.error?.message ??
            "Something went wrong. Please try again."
        );
    }

    return data as ChatResponse;
}
