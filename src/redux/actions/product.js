import { PRODUCT } from "../../utils/constants.json";


export function setProductData(data) {
    return (dispatch, getState) => {
        dispatch({ type: PRODUCT.SET_ALL_PRODUCT, payload: data });
    };
}


export function setLocationData(data) {
    return (dispatch, getState) => {
        dispatch({ type: PRODUCT.SET_ALL_LOCATION, payload: data });
    };
}

