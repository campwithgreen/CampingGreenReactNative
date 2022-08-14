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

export function setTotalDays(data) {
    return (dispatch, getState) => {
        dispatch({ type: COMMON.SET_TOTAL_DAYS, payload: data });
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


export function setUserCartHistory(data) {
    return (dispatch, getState) => {
        dispatch({ type: COMMON.SET_USER_CART_HISTORY, payload: data });
    };
}

export function setSelectedLocation(data) {
    return (dispatch, getState) => {
        dispatch({ type: COMMON.SELECTED_LOCATION, payload: data });
    };
}

export function setSelectedSubLocation(data) {
    return (dispatch, getState) => {
        dispatch({ type: COMMON.SELECTED_SUB_LOCATION, payload: data });
    };
}

export function setMainCartItems(data) {
    return (dispatch, getState) => {
        dispatch({ type: COMMON.SET_MAIN_CART_ITEMS, payload: data });
    };
}