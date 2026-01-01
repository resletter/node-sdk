/**
 * Error class for Resletter API errors
 */
export class ResletterError extends Error {
    /** HTTP status code */
    public readonly status: number;

    /** Error code from the API */
    public readonly code?: string;

    /** Original response data */
    public readonly data?: unknown;

    constructor(message: string, status: number, code?: string, data?: unknown) {
        super(message);
        this.name = 'ResletterError';
        this.status = status;
        this.code = code;
        this.data = data;

        // Maintains proper stack trace for where the error was thrown
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ResletterError);
        }
    }
}
