import { CustomError } from "./custom-error";
export class databaseConnectionError extends CustomError {
  statusCode = 500;
  constructor() {
    super("error connecting to database");
    Object.setPrototypeOf(this, databaseConnectionError.prototype);
  }
  serializeError() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
