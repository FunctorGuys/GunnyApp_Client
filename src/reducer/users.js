import {
    LOGIN_USER,
    LOGOUT_USER,
    SAVE_TOKEN
} from "../constants/action.constants";
const initReducer = {
    isLogged: false,
    userLogged: {},
    token: "",
};

const users = (state = initReducer, { type, payload } ) => {
    switch(type) {
        case LOGIN_USER: {
            return {
                ...state,
                isLogged: true,
                userLogged: payload
            }
        }

        case SAVE_TOKEN: {
            return {
                ...state,
                token: payload
            }
        }

        case LOGOUT_USER: {
            return {
                isLogged: false,
                userLogged: {}
            }
        }
        
        default: return state;
    }
}

export default users;