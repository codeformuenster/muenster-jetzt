import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useQuery: () => Record<string, string | boolean> | null = () => {
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
          let key = "";
          let value: string | undefined | boolean;
          [key, value] = tuple.split("=");

          // set empty values to 'true' to allow easy
          // existence checking
          if (typeof value === "undefined") {
            value = true;
          }

          return [key, value];
        })
        // remove empty keys
        .filter(([key]) => key !== "")
    );
  }, [search]);
};

export default useQuery;
