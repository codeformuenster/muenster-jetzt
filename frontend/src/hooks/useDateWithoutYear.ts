import { useMemo } from "react";

const useDateWithoutYear: (date?: string) => string = (date) => {
  return useMemo(() => {
    if (date) {
      const [, month, day] = date.split("-");
      return `${day}.${month}.`;
    }

    return "";
  }, [date]);
};

export default useDateWithoutYear;
