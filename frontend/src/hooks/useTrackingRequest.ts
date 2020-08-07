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
