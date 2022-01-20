export default class ApiError extends Error {
    status: number = null;
    errors: any[] = [];

    constructor(status: number, message: string, errors?: string[]) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(): ApiError {
        return new ApiError(401, 'Пользователь не авторизован');
    }

    static BadRequest(message: string, errors?: any[]): ApiError {
        return new ApiError(400, message, errors);
    }
}