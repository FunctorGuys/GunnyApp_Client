import {
    GET_ROOMS,
    ADD_ROOM,
    REMOVE_ROOM,
    LEAVE_ROOM,
    SELECT_ROOM,
    ON_READY,
} from "../constants/action.constants";
import {
    O_CARO,
    X_CARO
} from "../constants/caro.constants";

const uuid = require("uuid");

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
        const mySocket = getMySocket(getState);
        mySocket.emit("enterRoom", {room_id, user});
        dispatch({
            type: SELECT_ROOM,
            payload: {
                room_id,
            }
        })
    }
}

export const leaveRoom = room_id => {
    return (dispatch, getState) => {
        const mySocket = getMySocket(getState);
        mySocket.emit("leaveRoom", room_id);
        dispatch({
            type: LEAVE_ROOM,
        })
    }
}

export const onReady = (room_id, user_id) => {
    return (dispatch, getState) => {
        const mySocket = getMySocket(getState);
        mySocket.emit("onReady", {room_id, user_id});
    }
}

export const onNoReady = (room_id, user_id) => {
    return (dispatch, getState) => {
        const mySocket = getMySocket(getState);
        mySocket.emit("onNoReady", {room_id, user_id});
    }
}

export const ROOM_START = "ROOM_START";
export const roomReadyToStart = () => {
    return (dispatch) => {
        dispatch({
            type: ROOM_START,
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


export const createRoom = name => {
    return (dispatch, getState) => {
        const mySocket = getMySocket(getState);
        const user = getState().user.userLogged;
        const newRoom = {
            id: uuid(),
            name,
            isFull: false,
            creater: {
                ...user,
                socket_id: mySocket.id,
                caro_text: X_CARO,
                isReady: false,
            },
            invitee: {}
        }
        mySocket.emit("createRoom", newRoom);
    }
}

// Actions for room playing

export const onPressSquare = (x, y) => {
    return (dispatch, getState) => {
        const mySocket = getMySocket(getState);
        const room_id = getState().rooms.selectedRoom.idRoom;
        // const user = getState().user.userLogged;
        return mySocket.emit("onPressSquare", ({x, y, room_id}));
    }
}

export const setCaroWinner = (arrayXandYs) => {
    return (dispatch, getState) => {
        const mySocket = getMySocket(getState);
        const userLogged = getState().user.userLogged;
        const roomData = getState().rooms.allRooms.filter(room => room.id === getState().rooms.selectedRoom.idRoom)[0];

        let SocketIdLoser = roomData.creater.socket_id;
        let IdLoser = roomData.creater.id;
        let IdWinner = userLogged.id;
        
        if (roomData.creater.socket_id === mySocket.id) {
            SocketIdLoser = roomData.invitee.socket_id;
            IdLoser = roomData.invitee.id;
        }

        const data = {
            idRoom: roomData.id,
            SocketIdLoser,
            IdLoser,
            IdWinner,
            arrayXandYs
        }

        mySocket.emit("setCaroWinner", data);
    }
}