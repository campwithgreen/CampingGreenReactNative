
import { PRODUCT } from "../../utils/constants.json";
const INITIAL_STATE = { product: [] };

/**
 * Reducer - to update oauth state
 * @param {Object} state initial dafault oauth state
 * @param {Object} action action to be performed
 * @returns {Object} new oauth state
 */
export default function (state = INITIAL_STATE, action) {
    const { payload, type } = action;
    switch (type) {
        case PRODUCT.SET_ALL_PRODUCT:
            return { ...state, product: payload };
        default:
            return state;
    }
}
