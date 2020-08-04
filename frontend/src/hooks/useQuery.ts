import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useQuery: () => Record<string, string> | null = () => {
  const { search } = useLocation();

  return useMemo(() => {
    if (search === "") {
      return null;
    }

    return Object.fromEntries(
      search
        .substr(1)
        .split("&")
        .map((tuple) => {
          const pair = tuple.split("=");

          if (typeof pair[1] === "undefined") {
            pair[1] = true;
          }

          return pair;
        })
        // remove empty keys
        .filter(([key]) => key !== "")
    );
  }, [search]);
};

export default useQuery;
