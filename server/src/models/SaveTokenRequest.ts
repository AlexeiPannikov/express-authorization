export default class SaveTokenRequest {

    userId: string = "";
    refreshToken: string = "";

    constructor(obj?: Partial<SaveTokenRequest>) {
        if (obj) {
            Object.assign(this, obj)
        }
    }
}