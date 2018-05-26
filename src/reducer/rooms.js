import {
    GET_ROOMS,
    ADD_ROOM,
    REMOVE_ROOM,
    LEAVE_ROOM,
    SELECT_ROOM,
    ON_READY,
} from "../constants/action.constants";

import {
    INIT_SQUARES,
} from "../actions/room";

import {
    RECEIVED_ACTIVE_ROOMS,
    UPDATE_ROOM,
    CANCEL_ROOM,
    CREATE_ROOM,
    ENTER_MY_ROOM,
} from "../actions/socket";

const initReducer = {
    allRooms: [],
    selectedRoom: {
        idRoom: null,
        isReady: false,
        winner: null,
        squares: [],
    }
}

export default function(state = initReducer, { type, payload }) {
    switch(type) {
        case RECEIVED_ACTIVE_ROOMS: {
            return {
                ...state,
                allRooms: payload.rooms,
            }
        }

        case UPDATE_ROOM: {
            const allRooms = state.allRooms.map(room => {
                return room.id === payload.room.id ? payload.room : room;
            })
            return {
                ...state,
                allRooms
            }
        }

        case CANCEL_ROOM: {
            const allRooms = state.allRooms.filter(room => room.id !== payload.room_id);
            return {
                ...state,
                allRooms,
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
                selectedRoom: {
                    idRoom: payload.room_id,
                    winner: null
                }
            }
        }

        case ENTER_MY_ROOM: {
            return {
                ...state,
                selectedRoom: {
                    idRoom: payload.newRoom.id,
                    isReady: false,
                    winner: null,
                    squares: [],
                }
            }
        }

        case CREATE_ROOM: {
            console.log(CREATE_ROOM);
            return {
                ...state,
                allRooms: [
                    ...state.allRooms,
                    {
                        ...payload.newRoom,
                    }
                ]
            }
        }

        case ON_READY: {
            const allRooms = state.allRooms.map(room => {
                if (room.id === payload.room_id) {
                    if (room.creater.id === payload.user_id) {
                        return {
                            ...room,
                            creater: {
                                ...room.creater,
                                isReady: true,
                            }
                        }
                    }
                    if (room.invitee.id === payload.user_id) {
                        return {
                            ...room,
                            invitee: {
                                ...room.invitee,
                                isReady: true,
                            }
                        }
                    }
                }
                return room;
            })
            return {
                ...state,
                allRooms,
            }
        }

        case INIT_SQUARES: {
            return {
                ...state,
                selectedRoom: {
                    ...state.selectedRoom,
                    squares: payload.squares,
                }
            }
        }

        default: return state;
    }
}
