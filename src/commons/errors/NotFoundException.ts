import AppError from './AppError';

export default class NotFoundException extends AppError {
    constructor(message: string | undefined = undefined) {
        // Providing default message and overriding status code.
        super(message || 'NotFoundException error', 404);
    }
};