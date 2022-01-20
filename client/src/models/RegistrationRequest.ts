export default class RegistrationRequest {
    email: string = "";
    password: string = "";

    constructor(obj?: Partial<RegistrationRequest>) {
        if (obj) {
            Object.assign(this, obj)
        }
    }
}