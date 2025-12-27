export type AppErrorCode =
  | "INVALID_INPUT"
  | "LLM_UNAVAILABLE"
  | "INTERNAL";

export interface AppError {
  code: AppErrorCode;
  message: string;
}

export function createAppError(
  code: AppErrorCode,
  message: string
): AppError {
  return { code, message };
}
