import {
    LOGIN_USER,
    LOGOUT_USER,
    SAVE_TOKEN
} from "../constants/action.constants";
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

export default user;