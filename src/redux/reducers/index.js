import { combineReducers } from "redux";
import common from "./common.js";
import oauth from "./oauth.js";
import product from "./product.js";

const rootReducer = combineReducers({
    oauth: oauth,
    product: product,
    common: common
});

export default rootReducer;