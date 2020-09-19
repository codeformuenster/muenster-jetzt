import React, { FC, useMemo } from "react";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import styles from "./DateButton.module.scss";

export interface IDateButton {
  shortLabel: string;
  label: string;
  to: string;
  isoDate: string;
}

const DateButton: FC<IDateButton> = ({ shortLabel, to, label, isoDate }) => {
  const location = useLocation();
  const isToday = useMemo(() => {
    return new Date().toISOString().slice(0, 10) === isoDate;
  }, [isoDate]);

  const isWeekend = ['Sa', 'So'].includes(shortLabel)

  const dateArray : string[] = to?.split('-');
  const dayMonth : string = `${dateArray[2]}.${dateArray[1]}`;

  return (
    <div className={styles.dateButtonContainer}>
      <span className={clsx(styles.dateTitle, {
          [styles.isWeekendTitle]: isWeekend,
          [styles.isTodayTitle]: isToday,
        })}
      >
        {dayMonth}
      </span>
      <div className={styles.dateButtonWrapper}>
        <Link
          className={clsx(styles.dateButton, {
            [styles.isActive]: location.pathname === to,
            [styles.isWeekend]: isWeekend,
            [styles.isToday]: isToday,
          })}
          to={to}
          title={label}
        >
          {shortLabel}
        </Link>
      </div>
    </div>
  );
};

export default DateButton;
