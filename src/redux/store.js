import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./reducers/index"

const middleware = [thunk];

let composeEnhancers = (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware)),
);

export default store;
