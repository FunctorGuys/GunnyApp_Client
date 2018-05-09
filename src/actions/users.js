// import request from "../utils/request.js";

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

// export const getAbc = () => {
//     return dispatch => {
//         request().get("http://localhost:3001/api/user/abc").then(res => {
//             console.log(res);
//         })
//     }
// }