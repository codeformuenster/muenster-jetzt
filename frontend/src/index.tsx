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
import Kiosk from "./Kiosk/Kiosk";
import TrackingWrapper from "./TrackingWrapper";
import ScrollToTop from "./Helpers/ScrollToTop"
import { isoFormat } from "./utils/eventTime";
import {
  appRootRoute,
  appDayRoute,
  makeAppRouteLink,
  kioskRootRoute,
  infoRootRoute,
} from "./utils/routes";
import InfoPage from "./InfoPage/InfoPage.";

const backendBasePath =
  process?.env?.REACT_APP_BACKEND_BASE_PATH || "http://localhost:8000";

const fallbackLink = makeAppRouteLink(isoFormat(new Date()));

ReactDOM.render(
  <React.StrictMode>
    <RestfulProvider base={backendBasePath}>
      <Router>
        <TrackingWrapper />
        <ScrollToTop />
        <Switch>
          <Route exact path={appRootRoute}>
            <Redirect to={fallbackLink} />
          </Route>
          <Route path={appDayRoute}>
            <App />
          </Route>
          <Route path={kioskRootRoute}>
            <Kiosk />
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
