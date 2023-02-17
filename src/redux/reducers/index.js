import {combineReducers} from 'redux';
import common from './common.js';
import oauth from './oauth.js';
import product from './product.js';
import community from './community.js';
const rootReducer = combineReducers({
  oauth: oauth,
  product: product,
  common: common,
  community: community,
});

export default rootReducer;
