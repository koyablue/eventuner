class ModelNotFoundError extends AppError {
  constructor(message = "", originalError?: unknown) {
    super(message, originalError);
  }
}
