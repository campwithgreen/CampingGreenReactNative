import { combineReducers } from "redux";
import oauth from "./oauth.js";

const rootReducer = combineReducers({
    oauth: oauth
});

export default rootReducer;