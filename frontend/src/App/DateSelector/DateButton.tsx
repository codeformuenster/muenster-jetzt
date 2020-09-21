import React, { FC, useMemo } from "react";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import styles from "./DateButton.module.scss";
import useDateWithoutYear from "../../hooks/useDateWithoutYear";
import { isoFormat } from "../../utils/eventTime";

export interface IDateButton {
  shortLabel: string;
  label: string;
  to: string;
  isoDate: string;
}

const DateButton: FC<IDateButton> = ({ shortLabel, to, label, isoDate }) => {
  const location = useLocation();
  const isToday = useMemo(() => {
    return isoFormat(new Date()) === isoDate;
  }, [isoDate]);

  const isWeekend = ["Sa", "So"].includes(shortLabel);

  const dateWithoutYear = useDateWithoutYear(to);

  return (
    <div className={styles.dateButtonContainer}>
      <span
        className={clsx(styles.dateTitle, {
          [styles.isWeekendTitle]: isWeekend,
          [styles.isTodayTitle]: isToday,
        })}
      >
        {dateWithoutYear}
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
