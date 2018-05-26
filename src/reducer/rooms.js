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
            // const curRoom = state.allRooms.filter(room => room.id === payload.room_id);
            // let isRemove = true;
            // if (curRoom.invitee.id) {
            //     isRemove = false;
            // }
            // const allRooms = state.allRooms.map(room => {
            //     if (room.id === payload.room_id && room.invitee.id) {
            //         return {
            //             ...room,
            //             invitee: {},
            //         }
            //     }
            //     return {
            //         ...room
            //     }
            // })
            const allRooms = state.allRooms.reduce((cur, next) => {
                if (next.id === payload.room_id) {
                    if (next.invitee.id) {
                        return [
                            ...cur,
                            {
                                ...next,
                                invitee: {},
                                isFull: false,
                            }
                        ];
                    } else {
                        return cur;
                    }
                } else {
                    return [
                        ...cur,
                        {
                            ...next,
                        }
                    ];
                }
            }, []);
            return {
                ...state,
                allRooms,
                selectedRoom: initReducer.selectedRoom
            }
        }

        case SELECT_ROOM: {
            const allRooms = state.allRooms.map(room => {
                if (room.id === payload.room_id) return {
                    ...room,
                    isFull: true,
                    invitee: {
                        ...payload.user,
                        isReady: false,
                    }
                }
                return room;
            });
            return {
                ...state,
                allRooms,
                selectedRoom: {
                    idRoom: payload.room_id,
                    winner: null
                }
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
