import { FC } from "react";
import useNavigationTracking from "./hooks/useNavigationTracking";

const TrackingWrapper: FC = () => {
  useNavigationTracking();

  return null;
};

export default TrackingWrapper;
