import { combineReducers } from "redux";
import user from "./user";
import rooms from "./rooms";
import server from "./server";

export default combineReducers({
    user,
    rooms,
    server
})