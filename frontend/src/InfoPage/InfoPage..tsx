import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";

import { infoRootRoute, apiInfoRoute } from "../utils/routes";
import LandingPage from "./LandingPage";
import ApiInfoPage from "./ApiInfoPage";

const InfoPage: FC = () => (
  <Switch>
    <Route path={apiInfoRoute}>
      <ApiInfoPage />
    </Route>
    <Route path={infoRootRoute}>
      <LandingPage />
    </Route>
  </Switch>
);

export default InfoPage;
