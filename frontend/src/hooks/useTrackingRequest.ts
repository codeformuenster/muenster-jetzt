import { useLocation } from "react-router-dom";
import ky from "ky";
import useQuery from "./useQuery";

export interface ISendRequest {
  (additionalParams?: Record<string, string>): void;
}

const useTrackingRequest: () => ISendRequest = () => {
  const params = useQuery();
  const location = useLocation();

  const sendRequest: ISendRequest = (additionalParams) => {
    // Only send tracking requests if the `device` query parameter is present
    if (params?.device) {
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
