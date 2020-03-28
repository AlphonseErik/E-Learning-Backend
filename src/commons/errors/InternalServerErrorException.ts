import AppError from './AppError';

export default class InternalServerErrorException extends AppError {
    constructor(message: string | undefined = undefined) {
        // Providing default message and overriding status code.
        super(message || 'InternalServerErrorException error', 500);
    }
};