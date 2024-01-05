import { AppError } from "./appError";

export class InternalServerError extends AppError {
  constructor(message = "", originalError?: unknown) {
    super(message, originalError);
  }
}
