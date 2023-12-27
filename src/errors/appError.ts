class AppError extends Error {
  public originalError: Error | unknown;

  constructor(message = "", originalError?: unknown) {
    super(message);
    this.originalError = originalError;

    if (originalError instanceof Error) {
      // combine stack trace
      this.stack = `${this.stack}\nCaused by: ${originalError.stack}`;
    }
  }
}