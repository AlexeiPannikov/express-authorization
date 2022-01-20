import LoginRequest from "../models/LoginRequest";
import BaseResponse from "../models/BaseResponse";
import LoginResponse from "../models/LoginResponse";
import $api, {API_URL} from "../http";
import RegistrationRequest from "../models/RegistrationRequest";
import RegistrationResponse from "../models/RegistrationResponse";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import IUser from "../interfaces/IUser";
import RefreshTokensResponse from "../models/RefreshTokensResponse";

export default class AuthService {
    static async registration(request: RegistrationRequest): Promise<BaseResponse<RegistrationResponse>> {
        try {
            const response = await $api.post<BaseResponse<RegistrationResponse>>('/registration', request);
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    static async login(request: LoginRequest): Promise<BaseResponse<LoginResponse>> {
        try {
            const response = await $api.post<BaseResponse<LoginResponse>>('/login', request);
            localStorage.setItem('token', response.data.Value.accessToken);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    static async logout(): Promise<BaseResponse<any>> {
        try {
            const response = await $api.post('/logout');
            localStorage.removeItem('token');
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    static async checkAuth() {
        try {
            const response = await axios.get<BaseResponse<RefreshTokensResponse>>(
                `${API_URL}/refresh`,
                {withCredentials: true}
            );
            localStorage.setItem('token', response.data.Value.accessToken);
            return response;
        } catch (e) {
            console.log(e);
        }
    }
}