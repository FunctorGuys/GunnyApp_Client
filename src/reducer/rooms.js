import {
    GET_ROOMS,
    ADD_ROOM,
    REMOVE_ROOM,
    LEAVE_ROOM,
    SELECT_ROOM,
} from "../constants/action.constants";

const initReducer = {
    allRooms: [],
    selectedRoom: {
        me: {},
        player: {},
        isReady: false,
        winner: null,
    }
}

export default function(state = initReducer, { type, payload }) {
    switch(type) {
        case GET_ROOMS: {
            return {
                ...state,
                allRooms: payload,
            }
        }
        
        case ADD_ROOM: {
            return {
                ...state,
                allRooms: [
                    ...state.allRooms,
                    {
                        ...payload
                    },
                ]
            }
        }

        case REMOVE_ROOM: {
            const newRooms = state.allRooms.filter(room => room.id !== payload);
            return {
                ...state,
                allRooms: newRooms,
            }
        }

        case LEAVE_ROOM: {
            return {
                ...state,
                selectedRoom: initReducer.selectedRoom
            }
        }

        case SELECT_ROOM: {
            return {
                ...state,
                selectedRoom: payload
            }
        }

        default: return state;
    }
}
