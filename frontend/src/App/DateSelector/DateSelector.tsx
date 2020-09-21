import React, { FC, useMemo } from "react";
import styles from "./DateSelector.module.scss";
import DateButton, { IDateButton } from "./DateButton";
import DateArrow, { Direction } from "./DateArrow";
import useParsedDateRouteParam from "../../hooks/useParsedDateRouteParam";
import { oneDay } from "../../utils/eventTime";

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
    const prev = new Date(date.getTime() - oneDay);
    const next = new Date(date.getTime() + oneDay);

    return {
      prev: prev.toISOString().slice(0, 10),
      next: next.toISOString().slice(0, 10),
    };
  }

  return {};
};

const DateSelector: FC = () => {
  const parsedDateParam = useParsedDateRouteParam();

  const dates = useMemo<IDateButton[]>(() => {
    const now = Date.now();

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now + 86400000 * i);
      const isoDate = d.toISOString().slice(0, 10);

      return {
        label: weekdayLongFormat.format(d),
        to: `/app/${isoDate}`,
        shortLabel: weekdayShortFormat.format(d),
        isoDate,
      };
    });
  }, []);

  const { prev, next } = usePrevNextDate(parsedDateParam);

  return (
    <div className={styles.dateSelectorContainer}>
      {prev && <DateArrow direction={Direction.Left} to={`/app/${prev}`} />}
      {dates.map((d) => (
        <DateButton key={d.to} {...d} />
      ))}
      {next && <DateArrow direction={Direction.Right} to={`/app/${next}`} />}
    </div>
  );
};

export default DateSelector;
