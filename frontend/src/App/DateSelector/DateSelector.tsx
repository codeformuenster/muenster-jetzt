import React, { FC, useMemo } from "react";
import styles from "./DateSelector.module.scss";
import DateButton, { IDateButton } from "./DateButton";
import { useParams } from "react-router-dom";
import { IAppParams } from "../App";
import DateArrow, { Direction } from "./DateArrow";

const weekdayShortFormat = new Intl.DateTimeFormat("de-DE", {
  weekday: "short",
});

const weekdayLongFormat = new Intl.DateTimeFormat("de-DE", {
  weekday: "long",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const usePrevNextDate: () => { prev?: string; next?: string } = () => {
  const { date } = useParams<IAppParams>();

  if (date) {
    const dateParts = date.split("-");
    const [year, month, day] = dateParts.map((d) => parseInt(d, 10));
    const prev = new Date(Date.UTC(year, month - 1, day - 1, 0, 0, 0, 0));
    const next = new Date(Date.UTC(year, month - 1, day + 1, 0, 0, 0, 0));

    return {
      prev: prev.toISOString().slice(0, 10),
      next: next.toISOString().slice(0, 10),
    };
  }

  return {};
};

const DateSelector: FC = () => {
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

  const { prev, next } = usePrevNextDate();

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
