import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, history } from "./store";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
