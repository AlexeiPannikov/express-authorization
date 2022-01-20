import {applyMiddleware, combineReducers, createStore} from "redux";
import { authReducer } from "./reducers/AuthReducer";
import {composeWithDevTools} from "@redux-devtools/extension";
import thunk from "redux-thunk";

const reducers = combineReducers({
    authReducer,
})



export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));