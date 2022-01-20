import React, {ChangeEventHandler, useEffect, useState} from 'react';
import RegistrationRequest from "./models/RegistrationRequest";
import authService from "./services/AuthService";
import {useDispatch, useSelector, DefaultRootState} from "react-redux";
import {authReducer, loginAction, logoutAction, refreshAction, registrationAction} from "./store/reducers/AuthReducer";
import IUser from "./interfaces/IUser";
import {log} from "util";

function App() {

    const [authData, setAuthData] = useState<RegistrationRequest>(new RegistrationRequest());

    const dispatch = useDispatch();
    const user = useSelector<any, IUser>(state => state.authReducer)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            authService.checkAuth()
                .then(r => {
                    dispatch(refreshAction({isAuth: true, ...r.data.Value} as IUser));
                    console.log(user)
                })
                .catch((e) => console.log(e))
        }
    }, [])

    function setEmail(e: any) {
        setAuthData({...authData, email: e.target.value})
    }

    function setPassword(e: any) {
        setAuthData({...authData, password: e.target.value})
    }

    async function registration() {
        try {
            const res = await authService.registration(authData);
            dispatch(registrationAction(res.Value as IUser))
            console.log(user)
        } catch (e) {
            console.log(e)
        }
    }

    async function login() {
        try {
            const res = await authService.login(authData);
            dispatch(loginAction({isAuth: true, ...res.Value} as IUser))
            console.log(user)
        } catch (e) {
            console.log(e)
        }
    }

    async function logout() {
        try {
            const res = await authService.logout();
            dispatch(logoutAction());
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="App">
            <h1>{user.isAuth ? `Пользователь ${user.email} вторизован` : 'Авторизуйтесь'}</h1>
            {
                user.isAuth && <h1>{user.isActivated ? `Аккаунт подтвержден` : 'Подтвердите аккаунт по почте'}</h1>
            }
            <input onChange={setEmail} type='text' placeholder='email'/>
            <input onChange={setPassword} type='text' placeholder='password'/>
            <button onClick={registration}>Зарегистрироваться</button>
            <button onClick={login}>Войти</button>
            <button onClick={logout}>Выйти</button>
        </div>
    );
}

export default App;
