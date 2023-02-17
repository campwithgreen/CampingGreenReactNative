import {COMMUNITY} from '../../utils/constants.json';

export function setPostDataAction(data) {
  return (dispatch, getState) => {
    dispatch({type: COMMUNITY.FETCH_POST, payload: data});
  };
}
export function setLikepostAction(data) {
  return (dispatch, getState) => {
    dispatch({type: COMMUNITY.UPDATE_LIKE, payload: data});
  };
}

export function setResetUpdateAction() {
  return (dispatch, getState) => {
    dispatch({type: COMMUNITY.RESET_UPDATE_LIKE, payload: []});
  };
}
