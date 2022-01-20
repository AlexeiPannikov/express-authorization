export default class RefreshTokensResponse {

    accessToken: string = null;
    refreshToken: string = null;
    userId: string = null;
    email: string = null;
    isActivated: boolean = false;

    constructor(obj?: Partial<RefreshTokensResponse>) {
        if (obj) {
            Object.assign(this, obj)
        }
    }
}