
import { OAUTH } from "../../utils/constants.json"
const INITIAL_STATE = { isLogin: false }

/**
 * Reducer - to update oauth state
 * @param {Object} state initial dafault oauth state
 * @param {Object} action action to be performed
 * @returns {Object} new oauth state
 */
export default function (state = INITIAL_STATE, action) {
    const { payload, type } = action;
    switch (type) {
        case OAUTH.LOGIN:
            return { ...state, ...payload }
        case OAUTH.LOGOUT:
            return { ...state, isLogin: false }
        default:
            return state;
    }
}
