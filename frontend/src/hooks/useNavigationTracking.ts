import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useQuery from "./useQuery";
import useTrackingRequest from "./useTrackingRequest";

const useNavigationTracking = () => {
  const params = useQuery();
  const location = useLocation();
  const sendRequest = useTrackingRequest();

  useEffect(() => {
    sendRequest({ source: "navigation" });
  }, [params, location.pathname]);
};

export default useNavigationTracking;
