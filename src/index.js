import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import configureStore from "./store.js";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";
import Contain from "./components/Container";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "react-toastify/dist/ReactToastify.css";

export const history = createBrowserHistory();
const store = configureStore({ data: {} }, history);

ReactDOM.render(
  <Provider store={store}>
    <Contain />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
