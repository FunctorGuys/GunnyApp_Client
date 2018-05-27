export const sk_connect = (socketClient, host) => {
    return (dispatch, getState) => {
        dispatch({
            type: "CONNECT_SOCKET",
            payload: {
                apiUrl: `${host}/api`,
                socketClient,
            },
        })
        clientListen(socketClient, dispatch, getState);
    }
}

export const RECEIVED_ACTIVE_ROOMS = "RECEIVED_ACTIVE_ROOMS";
export const UPDATE_ROOM = "UPDATE_ROOM";
export const CANCEL_ROOM = "CANCEL_ROOM";
export const ENTER_MY_ROOM = "ENTER_MY_ROOM";
export const CREATE_ROOM = "CREATE_ROOM";
export const ON_PRESS_SQUARE = "ON_PRESS_SQUARE";
const clientListen = (mySocket, dispatch, getState) => {
    mySocket.on("receivedActiveRooms", rooms => {
        console.log("receivedActiveRooms");
        dispatch({
            type: RECEIVED_ACTIVE_ROOMS,
            payload: {
                rooms,
            }
        })
    })

    mySocket.on("updateRoom", room => {
        console.log(UPDATE_ROOM);
        dispatch({
            type: UPDATE_ROOM,
            payload: {
                room,
            }
        })
    })

    mySocket.on("cancelRoom", room_id => {
        console.log(CANCEL_ROOM);
        dispatch({
            type: CANCEL_ROOM,
            payload: {
                room_id,
            }
        })
    })

    mySocket.on("createRoom", newRoom => {
        dispatch({
            type: CREATE_ROOM,
            payload: {
                newRoom,
            }
        })
    })

    mySocket.on("createdRoom", newRoom => {
        dispatch({
            type: ENTER_MY_ROOM,
            payload: {
                newRoom,
            }
        })
    })

    mySocket.on("onPressSquare", async (data) => {
        const userLogged = getState().user.userLogged;
        dispatch({
            type: ON_PRESS_SQUARE,
            payload: {
                ...data,
                userLogged,
            }
        })
    })
}
