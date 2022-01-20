import $api from "../http";
import BaseResponse from "../models/BaseResponse";
import GetUsersResponse from "../models/GetUsersResponse";

export default class UserService {
    static async getUsers(): Promise<BaseResponse<GetUsersResponse>> {
        const response = await $api.get('/users')
        return response.data
    }
}