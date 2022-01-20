export default class GetUsersResponse {
    id: string = "";
    email: string = "";

    constructor(obj?: Partial<GetUsersResponse>) {
        if (obj) {
            Object.assign(this, obj)
        }
    }
}