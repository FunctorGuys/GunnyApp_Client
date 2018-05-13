import {
    GET_ROOMS,
    ADD_ROOM,
    REMOVE_ROOM,
    LEAVE_ROOM,
    SELECT_ROOM,
} from "../constants/action.constants";
export const enterRoom = room_id => {
    return (dispatch, getState) => {
        const user = getState().user.userLogged;
        console.log(user);
        dispatch({
            type: SELECT_ROOM,
            payload: {
                room_id,
                user
            }
        })
    }
}