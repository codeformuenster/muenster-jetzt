import { useMemo } from "react";
import useQuery from "./useQuery";

const useDevice: () => string | null = () => {
  const query = useQuery();

  return useMemo(() => {
    if (query?.device) {
      return query.device as string;
    }

    return null;
  }, [query]);
};

export default useDevice;
