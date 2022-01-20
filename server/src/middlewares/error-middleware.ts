import {Request, Response} from 'express';
import ApiError from "../exeptions/ApiError";
import BaseResponse from "../models/BaseResponse";

export function errorMiddleware(err: Error, req: Request, res: Response, next: Function) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json(new BaseResponse({
            ErrorMessage: err.message,
            Errors: err.errors,
            Status: err.status,
            IsSuccess: false,
        }))
    }
    return res.status(500).json(new BaseResponse({
        ErrorMessage: 'Непредвиденная ошибка',
        Status: 500,
        IsSuccess: false
    }))
}