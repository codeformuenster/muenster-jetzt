import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RestfulProvider } from "restful-react";

import App from "./App/App";
import Kiosk from "./Kiosk/Kiosk";
import LandingPage from "./LandingPage/LandingPage";
import TrackingWrapper from "./TrackingWrapper";

const backendBasePath =
  process?.env?.REACT_APP_BACKEND_BASE_PATH || "http://localhost:8000";

ReactDOM.render(
  <React.StrictMode>
    <RestfulProvider base={backendBasePath}>
      <Router>
        <TrackingWrapper />
        <Switch>
          <Route path="/app">
            <App />
          </Route>
          <Route path="/kiosk">
            <Kiosk />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </RestfulProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
