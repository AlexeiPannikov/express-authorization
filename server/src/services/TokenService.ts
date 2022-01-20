import jwt from "jsonwebtoken";
import GenerateTokenRequest from "../models/GenerateTokenRequest";
import GenerateTokensResponse from "../models/GenerateTokensResponse";
import ITokenService from "../interfaces/ITokenService";
import SaveTokenRequest from "../models/SaveTokenRequest";
import TokenModel from "../models/TokenModel";

class TokenService implements ITokenService {
    generateTokens(payload: GenerateTokenRequest): GenerateTokensResponse {
        const accessToken = jwt.sign({payload}, process.env.JWT_ACCESS_SECRET || 'werdfxcvf44sddfg', {expiresIn: '15s'});
        const refreshToken = jwt.sign({payload}, process.env.JWT_REFRESH_SECRET || '4w34tds567urhtrt', {expiresIn: '30s'});
        return new GenerateTokensResponse(accessToken, refreshToken)
    }

    validateRefreshToken(token:string):  string | jwt.JwtPayload | null {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        } catch (e) {
            return null;
        }
    }

    validateAccessToken(token:string):  string | jwt.JwtPayload | null {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        } catch (e) {
            return null;
        }
    }

    async saveToken(model: SaveTokenRequest): Promise<string> {
        const {userId, refreshToken} = model
        const tokenData = await TokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await TokenModel.create({user: userId, refreshToken});
    }

    async removeToken(refreshToken: string):  Promise<any> {
        return TokenModel.deleteOne({refreshToken});
    }

    async findToken(refreshToken: string):  Promise<any> {
        return TokenModel.findOne({refreshToken});
    }
}

export default new TokenService();