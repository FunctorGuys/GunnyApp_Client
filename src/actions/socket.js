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
}
