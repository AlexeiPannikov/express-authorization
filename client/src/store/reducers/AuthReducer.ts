import IUser from "../../interfaces/IUser";

interface IAction {
    type: string;
    payload: IUser;
}

const defaultState: IUser = {
    userId: "",
    email: "",
    isActivated: false,
    accessToken: "",
    refreshToken: "",
    isAuth: false
}

const REGISTRATION = "REGISTRATION";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ACTIVATE = "ACTIVATE";
const REFRESH = "REFRESH";
const GET_USERS = "LOGOUT";

export function authReducer (state = defaultState, action: IAction) {
    switch (action.type) {
        case REGISTRATION:
            return {...state, ...action.payload};
        case LOGIN:
            return {...state, ...action.payload};
        case LOGOUT:
            return state;
        case REFRESH:
            return {...state, ...action.payload};
        default: return state;
    }
}

export const registrationAction = (payload: IUser) => ({type: REGISTRATION, payload} as IAction);
export const loginAction = (payload: IUser) => ({type: LOGIN, payload} as IAction);
export const logoutAction = () => ({type: LOGIN, payload: defaultState} as IAction);
export const refreshAction = (payload: IUser) => ({type: LOGIN, payload} as IAction);