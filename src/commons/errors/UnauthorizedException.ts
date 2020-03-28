import AppError from './AppError';

export default class UnauthorizedException extends AppError {
    constructor(message: string | undefined = undefined) {
        // Providing default message and overriding status code.
        super(message || ' UnauthorizedException error', 401);
    }
};