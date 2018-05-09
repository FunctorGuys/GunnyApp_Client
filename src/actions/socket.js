
export const sk_connect = (skClient, host) => {
    return dispatch => {
        dispatch({
            type: "SAVE_API_URL",
            payload: `${host}/api`,
        })
        skClient.on("mes", data => {
            console.log(data);
        })
    }
}
