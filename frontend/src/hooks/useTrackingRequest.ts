import { useLocation } from "react-router-dom";
import ky from "ky";
import useQuery from "./useQuery";

const useTrackingRequest = () => {
  const params = useQuery();
  const location = useLocation();

  const sendRequest: (additionalParams?: Record<string, string>) => void = (
    additionalParams
  ) => {
    if (params?.track) {
      // send params somewhere
      ky.get(`/track`, {
        searchParams: {
          "x-path": location.pathname,
          ...params,
          ...additionalParams,
        },
      });
    }
  };

  return sendRequest;
};

export default useTrackingRequest;
