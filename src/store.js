import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { connectRouter, routerMiddleware } from "connected-react-router";

import reducers from "./reducers";

const configureStore = (initialState, history, apiHelper) => {
  let stack = [routerMiddleware(history), thunk];
  const middlewares = composeWithDevTools(applyMiddleware(...stack));
  const store = createStore(
    combineReducers({
      router: connectRouter(history),
      ...reducers,
    }),
    {
      ...initialState,
    },
    middlewares
  );

  return store;
};

export default configureStore;
