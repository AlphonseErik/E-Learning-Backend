import AppError from './AppError';

export default class BadRequestException extends AppError {
    constructor(message: string | undefined = undefined) {
        // Providing default message and overriding status code.
        super(message || 'BadRequestException error', 400);
    }
};