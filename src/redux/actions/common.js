import { COMMON } from "../../utils/constants.json";

export function setStartDate(data) {
    return (dispatch, getState) => {
        dispatch({ type: COMMON.SET_START_DATE, payload: data });
    };
}

export function setReturnDate(data) {
    return (dispatch, getState) => {
        dispatch({ type: COMMON.SET_RETURN_DATE, payload: data });
    };
}

export function setSelectedItem(data) {
    return (dispatch, getState) => {
        dispatch({ type: COMMON.SELECTED_ITEM, payload: data });
    };
}

export function setQuantity(data) {
    return (dispatch, getState) => {
        dispatch({ type: COMMON.SET_QUANTITY, payload: data });
    };
}

export function setCurrentCheckoutCartDetails(data) {
    return (dispatch, getState) => {
        dispatch({ type: COMMON.SET_CURRENT_CART_DETAILS, payload: data });
    };
}