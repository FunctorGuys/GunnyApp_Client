export default (state = {}, action) => {
    switch(action.type) {
        case "SAVE_API_URL": {
            return {
                ...state,
                API_URL: action.payload,
            }
        }
        default: return state;
    }
}