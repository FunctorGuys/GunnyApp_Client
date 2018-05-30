import {
    LOGOUT_USER,
    SAVE_TOKEN
} from "../constants/action.constants";

import {
    LOGGED_USER
} from "../actions/users";

import {
    SET_WINNER,
    IM_WINNER,
    IM_LOSER
} from "../actions/socket";

const initReducer = {
    isLogged: false,
    userLogged: {},
    token: "",
};

// const initReducer = {
//     isLogged: true,
//     userLogged: {
//         id: 155112,
//         username: "jinsphan",
//         fullname: "Jins Phan",
//         win: 11,
//         lose: 22,
//         rate: 0
//     },
//     token: "",
// };

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

        case IM_WINNER: {
            return {
                ...state,
                userLogged: {
                    ...state.userLogged,
                    win: state.userLogged.win + 1
                }
            }
        }

        case IM_LOSER: {
            return {
                ...state,
                userLogged: {
                    ...state.userLogged,
                    lose: state.userLogged.lose + 1
                }
            }
        }

        // case SET_WINNER: {
        //     if (payload.id_winner === state.userLogged.id) {
        //         state.userLogged.win += 1;
        //     } else {
        //         state.userLogged.lose += 1;
        //     }

        //     return state;
        // }
        
        default: return state;
    }
}

export default user;