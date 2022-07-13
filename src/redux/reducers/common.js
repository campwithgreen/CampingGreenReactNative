
import { COMMON } from "../../utils/constants.json";
const INITIAL_STATE = {};

/**
 * Reducer - to update oauth state
 * @param {Object} state initial dafault oauth state
 * @param {Object} action action to be performed
 * @returns {Object} new oauth state
 */
export default function (state = INITIAL_STATE, action) {
    const { payload, type } = action;
    switch (type) {
        case COMMON.SET_START_DATE:
            return { ...state, start_date: payload };
        case COMMON.SET_RETURN_DATE:
            return { ...state, return_date: payload };
        case COMMON.SELECTED_ITEM:
            return { ...state, selected_item: payload };
        case COMMON.SET_QUANTITY:
            return { ...state, quantity: payload };
        case COMMON.SET_CURRENT_CART_DETAILS:
            return { ...state, current_cart_details: payload };
        case COMMON.SET_USER_CART_HISTORY:
            return { ...state, cart_history: payload };
        default:
            return state;
    }
}
