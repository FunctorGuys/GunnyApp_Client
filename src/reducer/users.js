import {
    ADD_USER
} from "../constants/action.constants";
const initReducer = [];

const users = (state = initReducer, { type, payload } ) => {
    switch(type) {
        case ADD_USER: {
            console.log(payload);
            return [
                ...state,
                payload
            ]
        }
        default: return state;
    }
}

export default users;