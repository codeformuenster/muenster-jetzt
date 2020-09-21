import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { parseDate } from "../utils/eventTime";

const useParsedDateRouteParam: () => Date | undefined = () => {
  const { date } = useParams<IAppRouterParams>();

  return useMemo(() => {
    if (date) {
      return parseDate(date);
    }

    return undefined;
  }, [date]);
};

export default useParsedDateRouteParam;
