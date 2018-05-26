export const sk_connect = (socketClient, host) => {
    return dispatch => {
        dispatch({
            type: "CONNECT_SOCKET",
            payload: {
                apiUrl: `${host}/api`,
                socketClient,
            },
        })
        clientListen(socketClient, dispatch);
    }
}

export const RECEIVED_ACTIVE_ROOMS = "RECEIVED_ACTIVE_ROOMS";
export const UPDATE_ROOM = "UPDATE_ROOM";
export const CANCEL_ROOM = "CANCEL_ROOM";
export const ENTER_MY_ROOM = "ENTER_MY_ROOM";
export const CREATE_ROOM = "CREATE_ROOM";
const clientListen = (mySocket, dispatch) => {
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
}
