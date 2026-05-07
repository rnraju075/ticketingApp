import { ValidationError } from "express-validator";

export class databaseConnectionError extends Error {
    constructor() {
        super("Error connecting to database 1");  
        Object.setPrototypeOf(this, databaseConnectionError.prototype);
    }
}