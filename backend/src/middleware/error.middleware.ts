import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import type { AppError } from "../errors/app-error.js";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Handling validation errors
  if (err instanceof ZodError) {
    const firstIssue = err.issues[0];

    res.status(400).json({
      error: {
        code: "INVALID_INPUT",
        message: firstIssue?.message ?? "Invalid request payload",
      },
    });
    return;
  }

  
  if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    "message" in err
  ) {
    const appErr = err as AppError;

    res.status(400).json({
      error: {
        code: appErr.code,
        message: appErr.message,
      },
    });
    return;
  }

  console.error("Unhandled error:", err);

  res.status(500).json({
    error: {
      code: "INTERNAL",
      message: "Unexpected error occurred",
    },
  });
}
