export default class LoginResponse {

    accessToken: string = null;
    refreshToken: string = null;
    userId: string = null;
    email: string = null;
    isActivated: boolean = false;

    constructor(obj?: Partial<LoginResponse>) {
        if (obj) {
            Object.assign(this, obj)
        }
    }
}