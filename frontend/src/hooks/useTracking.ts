import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ky from "ky";
import useQuery from "./useQuery";

const useNavigationTracking = () => {
  const params = useQuery();
  const location = useLocation();

  useEffect(() => {
    if (params?.track) {
      // send params somewhere
      ky.get(`/track`, {
        searchParams: {
          "x-path": location.pathname,
          ...params,
        },
      });
    }
  }, [params, location.pathname]);
};

export default useNavigationTracking;
