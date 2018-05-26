import request from "../utils/request";
import axios from "axios";

if (!global.atob) {
    global.atob = require('base-64').decode;
}

import {
    ADD_USER,
    SAVE_TOKEN
} from "../constants/action.constants";

const cb = () => {};

const _axios = (getState) => {
    console.log(getState().server.API_URL);
    return request(getState().server.API_URL, getState().user.token);
}

export const addUser = (user) => {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_USER,
            payload: user
        })
    }
}

export const LOGGED_USER = "LOGGED_USER";
export const loginUser = (user, cb = () => {}) => {
    return (dispatch, getState) => {
        return _axios(getState).post("/user/login", user).then(res => {
            let userLogged = JSON.parse(global.atob(res.data.token.split(".")[1]));
            
            userLogged = {
                id: userLogged.id,
                username: userLogged.username,
                fullname: userLogged.fullname,
                win: userLogged.win,
                lose: userLogged.lose,
                rate: userLogged.rate,
            },

            dispatch({
                type: LOGGED_USER,
                payload: {
                    userLogged,
                    token: res.data.token,
                }
            })
            
        })
    }
}

export const registerUser = (user, cb = cb) => (dispatch, getState) => {
    return _axios(getState).post("/user/register", user).then(res => {
        cb(false, res.data);
    })
}

export const getAbc = () => {
    return (dispatch, getState) => {
        return axios.get("http://192.168.0.113:3001/api/user/abc").then(res => {
            console.log(res.data);
        })
    }
}