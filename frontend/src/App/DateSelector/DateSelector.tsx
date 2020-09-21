import React, { FC, useMemo } from "react";
import styles from "./DateSelector.module.scss";
import DateButton, { IDateButton } from "./DateButton";
import DateArrow, { Direction } from "./DateArrow";
import useParsedDateRouteParam from "../../hooks/useParsedDateRouteParam";
import { isoFormat, oneDay } from "../../utils/eventTime";
import { makeAppRouteLink } from "../../utils/routes";

const weekdayShortFormat = new Intl.DateTimeFormat("de-DE", {
  weekday: "short",
});

const weekdayLongFormat = new Intl.DateTimeFormat("de-DE", {
  weekday: "long",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const usePrevNextDate: (date?: Date) => { prev?: string; next?: string } = (
  date
) => {
  if (date) {
    const prev = new Date(date.getTime());
    const next = new Date(date.getTime());

    prev.setDate(date.getDate() - 7);
    next.setDate(date.getDate() + 7);

    return {
      prev: isoFormat(prev),
      next: isoFormat(next),
    };
  }

  return {};
};

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

  const { prev, next } = usePrevNextDate(parsedDateParam);

  return (
    <div className={styles.dateSelectorContainer}>
      {prev && (
        <DateArrow direction={Direction.Left} to={makeAppRouteLink(prev)} />
      )}
      {dates.map((d) => (
        <DateButton key={d.to} {...d} />
      ))}
      {next && (
        <DateArrow direction={Direction.Right} to={makeAppRouteLink(next)} />
      )}
    </div>
  );
};

export default DateSelector;
