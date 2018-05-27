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
    ROOM_START,
} from "../actions/room";

import {
    RECEIVED_ACTIVE_ROOMS,
    UPDATE_ROOM,
    CANCEL_ROOM,
    CREATE_ROOM,
    ENTER_MY_ROOM,
    ON_PRESS_SQUARE,
    FILL_SQUARE_WIN,
    SET_WINNER,
    ROOM_STOP,
} from "../actions/socket";

const initReducer = {
    allRooms: [],
    selectedRoom: {
        idRoom: null,
        isReady: false,
        isAllowPress: true,
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
                    ...state.selectedRoom,
                    idRoom: payload.room_id,
                }
            }
        }

        case ENTER_MY_ROOM: {
            return {
                ...state,
                selectedRoom: {
                    ...state.selectedRoom,
                    idRoom: payload.newRoom.id,
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

        case ROOM_START: {
            return {
                ...state,
                selectedRoom: {
                    ...state.selectedRoom,
                    isReady: true
                }
            }
        }

        case ROOM_STOP: {
            return {
                ...state,
                selectedRoom: {
                    ...state.selectedRoom,
                    isReady: false,
                }
            }
        }

        case ON_PRESS_SQUARE: {
            const squares = [...state.selectedRoom.squares];
            squares[payload.x][payload.y].isFill = true;
            squares[payload.x][payload.y].text = payload.caro_text;

            const curRoom = state.allRooms.filter(room => room.id === state.selectedRoom.idRoom)[0];
            const me_caro_text = curRoom.creater.id === payload.userLogged.id ? curRoom.creater.caro_text : curRoom.invitee.caro_text;
            let isAllowPress;
            if (me_caro_text === payload.caro_text) { // Toi dang danh thi diable danh
                isAllowPress = false;
            } else { // nguoi khac danh thi mo toi ra
                isAllowPress = true;
            }

            return {
                ...state,
                selectedRoom: {
                    ...state.selectedRoom,
                    isAllowPress,
                    squares,
                }
            }
        }

        case FILL_SQUARE_WIN: {
            const squares = [...state.selectedRoom.squares];
            payload.arrayXandYs.forEach(pos => {
                squares[pos.x][pos.y].isWin = true;
            })

            return {
                ...state,
                selectedRoom: {
                    ...state.selectedRoom,
                    squares,
                }
            }
            
        }

        // case SET_WINNER: {
        //     const allRooms = state.allRooms.map(room => {
        //         if (room.id === state.selectedRoom.idRoom) {
        //             if (room.creater.id === payload.id_winner) {
        //                 room.creater.win += 1;
        //                 room.invitee.lose += 1; 
        //             } else {
        //                 room.creater.lose += 1;
        //                 room.invitee.win += 1; 
        //             }
        //         }
        //         return room;
        //     })
            
        //     return {
        //         ...state,
        //         allRooms,
        //         selectedRoom: {
        //             ...state.selectedRoom,
        //             winner: payload.id_winner,
        //         }
        //     }
        // }

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
