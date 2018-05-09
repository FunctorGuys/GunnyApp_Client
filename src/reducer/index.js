import { combineReducers } from "redux";
import users from "./users";
import rooms from "./rooms";
import server from "./server";

export default combineReducers({
    users,
    rooms,
    server
})