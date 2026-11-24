import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { RestfulProvider } from "restful-react";

import App from "./App/App";
import ScrollToTop from "./Helpers/ScrollToTop";
import { isoFormat } from "./utils/eventTime";
import {
  appRootRoute,
  appDayRoute,
  makeAppRouteLink,
  infoRootRoute,
} from "./utils/routes";
import InfoPage from "./InfoPage/InfoPage.";
import backendBasePath from "./utils/config";

const fallbackLink = makeAppRouteLink(isoFormat(new Date()));

ReactDOM.render(
  <React.StrictMode>
    <RestfulProvider base={backendBasePath}>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path={appRootRoute}>
            <Redirect to={fallbackLink} />
          </Route>
          <Route path={appDayRoute}>
            <App />
          </Route>
          <Route path={infoRootRoute}>
            <InfoPage />
          </Route>
          {/* Fallback */}
          <Route>
            <Redirect to={fallbackLink} />
          </Route>
        </Switch>
      </Router>
    </RestfulProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
