import {
    LOGIN_USER,
    LOGOUT_USER
} from "../constants/action.constants";
const initReducer = {
    isLogged: false,
    userLogged: {}
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