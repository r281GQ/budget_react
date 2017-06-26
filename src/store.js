import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer, routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import auth from "./reducers/auth";
import model from "./reducers/model";
import filter from "./reducers/filter";
import createHistory from "history/createBrowserHistory";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    auth,
    model,
    filter,
    form: formReducer,
    router: routerReducer
  }),
  composeEnhancers(applyMiddleware(thunk, middleware))
);

export { store, history };
