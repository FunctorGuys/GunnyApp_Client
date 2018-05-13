import {
    GET_ROOMS,
    ADD_ROOM,
    REMOVE_ROOM,
    LEAVE_ROOM,
    SELECT_ROOM,
    ON_READY,
} from "../constants/action.constants";
export const enterRoom = room_id => {
    return (dispatch, getState) => {
        const user = getState().user.userLogged;
        dispatch({
            type: SELECT_ROOM,
            payload: {
                room_id,
                user
            }
        })
    }
}

export const leaveRoom = room_id => {
    return (dispatch, getState) => {
        dispatch({
            type: LEAVE_ROOM,
            payload: {
                room_id,
            }
        })
    }
}

export const onReady = (room_id, user_id) => {
    return (dispatch, getState) => {
        dispatch({
            type: ON_READY,
            payload: {
                room_id,
                user_id
            }
        })
    }
}