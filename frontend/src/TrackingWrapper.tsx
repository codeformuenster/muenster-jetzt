import React, { FC, Fragment } from "react";
import useNavigationTracking from "./hooks/useTracking";

const TrackingWrapper: FC = () => {
  useNavigationTracking();

  return null;
};

export default TrackingWrapper;
