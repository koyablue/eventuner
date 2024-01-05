import { AppError } from './appError';

export class ModelNotFoundError extends AppError {
  constructor(message = "", originalError?: unknown) {
    super(message, originalError);
  }
}
