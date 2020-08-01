import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RestfulProvider } from "restful-react";

import Kiosk from "./Kiosk/Kiosk";
import LandingPage from "./LandingPage/LandingPage";

ReactDOM.render(
  <React.StrictMode>
    <RestfulProvider base="http://localhost:8000">
      <Router>
        <Switch>
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
