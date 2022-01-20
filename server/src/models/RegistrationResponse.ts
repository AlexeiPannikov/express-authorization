export default class RegistrationResponse {

    accessToken: string = null;
    refreshToken: string = null;
    userId: string = null;
    email: string = null;
    isActivated: boolean = false;

    constructor(obj?: Partial<RegistrationResponse>) {
        if (obj) {
            Object.assign(this, obj)
        }
    }
}