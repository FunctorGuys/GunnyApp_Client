import {
    LOGOUT_USER,
    SAVE_TOKEN
} from "../constants/action.constants";

import {
    LOGGED_USER
} from "../actions/users";
// const initReducer = {
//     isLogged: false,
//     userLogged: {},
//     token: "",
// };

const initReducer = {
    isLogged: true,
    userLogged: {
        id: 155112,
        username: "jinsphan",
        fullname: "Jins Phan",
        win: 11,
        lose: 22,
        rate: 0
    },
    token: "",
};

const user = (state = initReducer, { type, payload } ) => {
    switch(type) {
        case LOGGED_USER: {
            return {
                ...state,
                userLogged: payload.userLogged,
                token: payload.token,
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

export default user;