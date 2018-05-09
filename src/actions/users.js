import request from "../utils/request";

import {
    ADD_USER,
    SAVE_TOKEN
} from "../constants/action.constants";

const _axios = (getState) => {
    return request(getState().server.API_URL, getState().users.token);
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
        console.log(user);
        return _axios(getState).post("/user/login", user).then(res => {
            console.log(res);
            dispatch({
                type: SAVE_TOKEN,
                payload: res.data.token
            })
        })
    }
}

export const getAbc = () => {
    return (dispatch, getState) => {
        return _axios(getState).get("/user/abc").then(res => {
            console.log(res);
        })
    }
}