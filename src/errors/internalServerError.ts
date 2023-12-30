class InternalServerError extends AppError {
  constructor(message = "", originalError?: unknown) {
    super(message, originalError);
  }
}
