export default interface IUser {
    userId: string;
    email: string;
    isActivated: boolean;
    accessToken: string;
    refreshToken: string;
    isAuth: boolean;
}