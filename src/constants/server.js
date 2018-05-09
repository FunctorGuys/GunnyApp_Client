export const connectServer = (host) => {
    return dispatch => {
        dispatch({
            type: "GET_SOCKET",
            payload: host
        })
    }
}