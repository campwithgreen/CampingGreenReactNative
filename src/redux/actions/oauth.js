import { OAUTH } from "../../utils/constants.json";

export function login(data) {
    return (dispatch, getState) => {
        dispatch({ type: OAUTH.LOGIN, payload: data });
    };
}

export function setUserData(data) {
    return (dispatch, getState) => {
        dispatch({ type: OAUTH.SET_USER_DATA, payload: data });
    };
}

export function setUserToken(data) {
    return (dispatch, getState) => {
        dispatch({ type: OAUTH.SET_USER_TOKEN, payload: data });
    };
}


