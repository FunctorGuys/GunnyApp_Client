import request from "../utils/request";
import axios from "axios";

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

export const loginUser = (user) => {
    return (dispatch, getState) => {
        return _axios(getState).post("/user/login", user).then(res => {
            dispatch({
                type: SAVE_TOKEN,
                payload: res.data.token
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