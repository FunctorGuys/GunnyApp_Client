const initState = {
    API_URL: "http://192.168.0.113:3001/api",
    mySocket: {},
}

export default (state = initState, action) => {
    switch(action.type) {
        case "CONNECT_SOCKET": {
            return {
                ...state,
                API_URL: action.payload.apiUrl,
                mySocket: action.payload.socketClient,
            }
        }
        default: return state;
    }
}