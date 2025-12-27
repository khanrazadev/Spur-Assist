export type Sender = "user" | "ai";

export type ChatMessage = {
  id: string;
  sender: Sender;
  text: string;
};

export type ChatResponse = {
  sessionId: string;
  reply: string;
};

export type ApiError = {
  error: {
    code: string;
    message: string;
  };
};


export type HistoryResponse = {
    messages: Array<{
        sender: "user" | "ai";
        text: string;
    }>;
};
