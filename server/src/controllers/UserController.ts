import {Request, Response} from 'express';
import UserService from "../services/UserService";
import RegistrationRequest from "../models/RegistrationRequest";
import BaseResponse from "../models/BaseResponse";
import {validationResult} from "express-validator";
import ApiError from "../exeptions/ApiError";
import LoginRequest from "../models/LoginRequest";

class UserController {
    async registration(req: Request, res: Response, next: Function) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const registrationRequest: RegistrationRequest = req.body;
            const userData = await UserService.registration(registrationRequest);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(new BaseResponse({
                Controller: "UserController",
                Method: "Registration",
                IsSuccess: true,
                Value: userData
            }));
        } catch (e) {
            next(e);
        }
    }

    async login(req: Request, res: Response, next: Function) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.login(new LoginRequest(email, password));
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(new BaseResponse({
                Controller: "UserController",
                Method: "Login",
                IsSuccess: true,
                Value: userData
            }));
        } catch (e) {
            next(e);
        }
    }

    async logout(req: Request, res: Response, next: Function) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).json(new BaseResponse({
                Controller: "UserController",
                Method: "Logout",
                IsSuccess: true,
                Value: token,
            }))
        } catch (e) {
            next(e);
        }
    }

    async activate(req: Request, res: Response, next: Function) {
        try {
            const activationLink: string = req.params.link;
            await UserService.activation(activationLink);
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: Request, res: Response, next: Function) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(new BaseResponse({
                Controller: "UserController",
                Method: "Refresh",
                IsSuccess: true,
                Value: userData
            }));
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req: Request, res: Response, next: Function) {
        try {
            const users = await UserService.getAllUsers()
            return res.status(200).json(new BaseResponse({
                Controller: "UserController",
                Method: "Refresh",
                IsSuccess: true,
                Value: users
            }))
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController()