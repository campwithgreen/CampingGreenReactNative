import { combineReducers } from "redux";
import oauth from "./oauth.js";
import product from "./product.js";

const rootReducer = combineReducers({
    oauth: oauth,
    product: product
});

export default rootReducer;