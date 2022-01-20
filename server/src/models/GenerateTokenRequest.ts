export default class GenerateTokenRequest {

    userId: string = "";
    email: string = "";
    isActivated: boolean = false;

    constructor(obj?: Partial<GenerateTokenRequest>) {
        if (obj) {
            Object.assign(this, obj)
        }
    }
}