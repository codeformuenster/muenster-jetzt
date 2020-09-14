import React, { FC, useMemo } from "react";
import styles from "./DateSelector.module.scss";
import DateButton, { IDateButton } from "./DateButton";

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

  return (
    <div className={styles.dateSelectorContainer}>
      {dates.map((d) => (
        <DateButton key={d.to} {...d} />
      ))}
    </div>
  );
};

export default DateSelector;
