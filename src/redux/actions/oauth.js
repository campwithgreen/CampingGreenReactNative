import { OAUTH } from "../../utils/constants.json"

export function login() {
    return (dispatch, getState) => {
        dispatch({ type: OAUTH.LOGIN, payload: { name: "Badal Sherpa" } })
    };
}