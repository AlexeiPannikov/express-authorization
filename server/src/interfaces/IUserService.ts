import RegistrationRequest from "../models/RegistrationRequest";
import RegistrationResponse from "../models/RegistrationResponse";
import LoginRequest from "../models/LoginRequest";
import LoginResponse from "../models/LoginResponse";
import RefreshTokensResponse from "../models/RefreshTokensResponse";

export default interface IUserService {
    registration(model: RegistrationRequest): Promise<RegistrationResponse>;
    activation(activationLink: string): void;
    login(model: LoginRequest): Promise<LoginResponse>;
    logout(refreshToken: string): Promise<any>;
    refresh(refreshToken: string):  Promise<RefreshTokensResponse>;
    getAllUsers(): Promise<any>;
}