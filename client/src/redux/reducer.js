import * as actions from './actions';
import { cloneDeep } from 'lodash';

const initialState = {
    username: "Guest...Login",
    email: "",
    token: "",
    loggedIn: false
}


export const todoReducer = (state = initialState, action) => {
    const newState = cloneDeep(state);
    switch (action.type) {

        case actions.LOGIN_USER:
            console.log("LOGIN action.username: ", action);
            newState.username = action.user.username;
            newState.email = action.user.email;
            newState.token = action.user.token;
            newState.loggedIn = true;
            console.log("new state.username: ", newState.username);
            return newState;

        case actions.REGISTER_USER:
            console.log("REGISTER action.username: ", action.username);
            newState.username = action.username;
            newState.email = action.email;
            newState.token = action.token;
            newState.loggedIn = true;
            console.log("new state.username: ", newState.username);
            return newState;

        case actions.LOGIN_ERROR:
            // console.log("LOGOUT action.username: ", action.username);
            newState.username = "wrong email or pswd";
            newState.email = "";
            newState.token = "";
            newState.loggedIn = false;
            console.log("new state.username: ", newState.username);
            return newState;

        case actions.LOGOUT_USER:
            // console.log("LOGOUT action.username: ", action.username);
            newState.username = "Guest...Login";
            newState.email = "";
            newState.token = "";
            newState.loggedIn = false;
            console.log("new state.username: ", newState.username);
            return newState;
        default:
            return state;
    }
} 