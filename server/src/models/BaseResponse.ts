export default class BaseResponse<T> {
    Controller: string = '';
    Method: string = '';
    ErrorMessage: string = '';
    Errors: string[] = [];
    IsSuccess: boolean = false;
    Status: number;
    Value: T = null;

    constructor(obj?: Partial<BaseResponse<T>>) {
        if (obj) {
            Object.assign(this, obj);
        }
    }

}