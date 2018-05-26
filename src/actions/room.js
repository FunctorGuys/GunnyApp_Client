import {
    GET_ROOMS,
    ADD_ROOM,
    REMOVE_ROOM,
    LEAVE_ROOM,
    SELECT_ROOM,
    ON_READY,
} from "../constants/action.constants";

const getMySocket = getState => getState().server.mySocket;

export const getActiveRooms = () => (dispatch, getState) => {
    // Get Active Rooms
    console.log("getActiveRooms");
    
    const mySocket = getMySocket(getState);
    mySocket.emit("getActiveRooms");
}

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

export const INIT_SQUARES = "initSquares";
export const initSquares = (numColSquare) => dispatch => {
    const squares = [];
    for(let i = 0; i < numColSquare; i++) {
        const newRowAr = [];
        for (let j = 0; j < numColSquare; j++) {
            newRowAr.push({
                id: i + "|" + j,
                isFill: false,
                isWin: false,
                text: "",
            });
        }
        squares.push(newRowAr);
    }
    dispatch({
        type: INIT_SQUARES,
        payload: {
            squares,
        }
    })
}

