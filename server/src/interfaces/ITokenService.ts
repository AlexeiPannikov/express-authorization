import GenerateTokenRequest from "../models/GenerateTokenRequest";
import GenerateTokensResponse from "../models/GenerateTokensResponse";
import SaveTokenRequest from "../models/SaveTokenRequest";
import jwt from "jsonwebtoken";

export default interface ITokenService {
    generateTokens(payload: GenerateTokenRequest): GenerateTokensResponse;
    saveToken(model: SaveTokenRequest): Promise<string>;
    removeToken(refreshToken: string): Promise<any>;
    validateRefreshToken(token: string): string | jwt.JwtPayload | null;
    validateAccessToken(token: string): string | jwt.JwtPayload | null;
    findToken(token: string): Promise<any>
}