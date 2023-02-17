import {COMMUNITY} from '../../utils/constants.json';
const INITIAL_STATE = {
  posts: [],
  updatePosts: {},
  createComment: {},
};

/**
 * Reducer - to update oauth state
 * @param {Object} state initial dafault oauth state
 * @param {Object} action action to be performed
 * @returns {Object} new oauth state
 */
export default function (state = INITIAL_STATE, action) {
  const {payload, type} = action;
  switch (type) {
    case COMMUNITY.FETCH_POST:
      return {...state, posts: payload};
    case COMMUNITY.UPDATE_LIKE:
      return {...state, updatePosts: payload};
    case COMMUNITY.RESET_UPDATE_LIKE:
      return {...state, updatePosts: payload};

    default:
      return state;
  }
}
