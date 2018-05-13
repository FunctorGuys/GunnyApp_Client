import {
    GET_ROOMS,
    ADD_ROOM,
    REMOVE_ROOM,
    LEAVE_ROOM,
    SELECT_ROOM,
} from "../constants/action.constants";

const initReducer = {
    allRooms: [
        {
            id: 154832146284,
            name: "ROOM001",
            isFull: true,
            creater: {
                id: 54554,
                username: "user001",
                fullname: "User 001",
                isReady: false,
                win: 2,
                lose: 12,
            },
            invitee: {
                id: 2444,
                username: "user002",
                fullname: "User 002",
                isReady: true,
                win: 3,
                lose: 10,
            }
        },
        {
            id: 154832148884,
            name: "ROOM002",
            isFull: false,
            creater: {
                id: 5422554,
                username: "user003",
                fullname: "User 003",
                isReady: false,
                win: 12,
                lose: 10,
            },
            invitee: {}
        }
    ],
    selectedRoom: {
        // idRoom: "ROOM002",
        // isReady: false,
        // winner: null,
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
                    isReady: false,
                    winner: null
                }
            }
        }

        default: return state;
    }
}
