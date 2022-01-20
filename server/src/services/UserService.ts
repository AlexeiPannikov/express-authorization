import RegistrationRequest from "../models/RegistrationRequest";
import User from "../models/UserModel";
import bcrypt from "bcryptjs";
import {v4} from "uuid";
import mailService from "./MailService";
import EmailActivationRequest from "../models/EmailActivationRequest";
import IUserService from "../interfaces/IUserService";
import TokenService from "./TokenService"
import GenerateTokenRequest from "../models/GenerateTokenRequest";
import SaveTokenRequest from "../models/SaveTokenRequest";
import RegistrationResponse from "../models/RegistrationResponse";
import ApiError from "../exeptions/ApiError";
import LoginResponse from "../models/LoginResponse";
import LoginRequest from "../models/LoginRequest";
import RefreshTokensResponse from "../models/RefreshTokensResponse";

class UserService implements IUserService {
    async registration(model: RegistrationRequest): Promise<RegistrationResponse> {
        const {email, password} = model;
        const candidate = await User.findOne({email});
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с email: ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const activationLink = v4();
        const user = await User.create({email, password: hashPassword, activationLink});
        await mailService.sendActivationLink(new EmailActivationRequest(email, `${process.env.API_URL}/api/activate/${activationLink}`));
        const tokens = TokenService.generateTokens(new GenerateTokenRequest({
            userId: user._id,
            email: user.email,
            isActivated: user.isActivated
        }))

        await TokenService.saveToken(new SaveTokenRequest({
            userId: user._id,
            refreshToken: tokens.refreshToken,
        }))

        return new RegistrationResponse({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            userId: user._id,
            email: user.email,
            isActivated: user.isActivated
        })
    }

    async activation(activationLink: string) {
        const user = await User.findOne({activationLink});
        if(!user) {
            throw  ApiError.BadRequest('Некорректная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }

    async login(model: LoginRequest): Promise<LoginResponse> {
        const {email, password} = model;
        const user = await User.findOne({email});
        if(!user) {
            throw ApiError.BadRequest(`Пользователь с email: ${email} не найден`)
        }
        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if(!isPasswordEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const tokens = TokenService.generateTokens(new GenerateTokenRequest({
            userId: user._id,
            email: user.email,
        }))
        await TokenService.saveToken(new SaveTokenRequest({
            userId: user._id,
            refreshToken: tokens.refreshToken,
        }))
        return new LoginResponse({
            userId: user._id,
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken,
            email: user.email,
            isActivated: user.isActivated,
        })
    }

     async logout(refreshToken: string) {
        return await TokenService.removeToken(refreshToken);
     }

     async refresh(refreshToken:string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = TokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findOne({refreshToken})
        const tokens = TokenService.generateTokens(new GenerateTokenRequest({
            userId: user._id,
            isActivated: user.isActivated,
            email: user.email
        }))
         await TokenService.saveToken(new SaveTokenRequest({
             refreshToken: tokens.refreshToken,
             userId: user._id,
         }))
         return new RefreshTokensResponse({
             email: user.email,
             userId: user._id,
             accessToken: tokens.accessToken,
             refreshToken: tokens.refreshToken,
             isActivated: user.isActivated
         })
     }

     async getAllUsers() {
        const users = await User.find();
        if (!users) {
            throw ApiError.BadRequest('Пользователи не найдены')
        }
        return users.map(user => {
            return {
                id: user._id,
                email: user.email,
                isActivated: user.isActivated
            }
        })
     }
}

export default new UserService();