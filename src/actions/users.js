import {
    ADD_USER
} from "../constants/action.constants";

export const addUser = (user) => {
    return dispatch => {
        console.log(user);
        dispatch({
            type: ADD_USER,
            payload: user
        })
    }
}