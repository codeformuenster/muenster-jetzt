import React, { FC, useMemo } from "react";
import styles from "./DateSelector.module.scss";
import DateButton, { IDateButton } from "./DateButton";
import useParsedDateRouteParam from "../../hooks/useParsedDateRouteParam";
import { isoFormat, oneDay } from "../../utils/eventTime";
import { makeAppRouteLink } from "../../utils/routes";
import Calendar from "../Calendar/Calendar";

const weekdayShortFormat = new Intl.DateTimeFormat("de-DE", {
  weekday: "short",
});

const weekdayLongFormat = new Intl.DateTimeFormat("de-DE", {
  weekday: "long",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const DateSelector: FC = () => {
  const parsedDateParam = useParsedDateRouteParam();

  const dates = useMemo<IDateButton[]>(() => {
    // take the current date param and use the monday of the week
    // as starting point
    if (!parsedDateParam) {
      return [];
    }

    const monday = new Date(parsedDateParam.getTime());
    const dow = monday.getDay();
    const diff = (dow < 1 ? 7 : 0) + dow - 1;
    monday.setDate(monday.getDate() - diff);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday.getTime() + oneDay * i);
      const isoDate = isoFormat(d);

      return {
        label: weekdayLongFormat.format(d),
        to: makeAppRouteLink(isoDate),
        shortLabel: weekdayShortFormat.format(d),
        isoDate,
      };
    });
  }, [parsedDateParam]);

  return (
    <div className={styles.dateSelectorContainer}>
      {dates.map((d) => (
        <DateButton key={d.to} {...d} />
      ))}
      <Calendar />
    </div>
  );
};

export default DateSelector;
