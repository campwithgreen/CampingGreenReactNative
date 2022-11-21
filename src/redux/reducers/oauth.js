
import { OAUTH } from "../../utils/constants.json";
const INITIAL_STATE = { isLogin: false };

/**
 * Reducer - to update oauth state
 * @param {Object} state initial dafault oauth state
 * @param {Object} action action to be performed
 * @returns {Object} new oauth state
 */
export default function (state = INITIAL_STATE, action) {
    const { payload, type } = action;
    switch (type) {
        case OAUTH.SET_USER_DATA:
            return { ...state, user_data: payload };
        case OAUTH.LOGIN:
            return { ...state, isLogin: payload };
        case OAUTH.LOGOUT:
            return { ...state, isLogin: false };
        case OAUTH.SET_USER_TOKEN:
            return { ...state, userToken: payload };
        default:
            return state;
    }
}
