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

  return (
    <Link
      className={clsx(styles.dateButton, {
        [styles.isActive]: location.pathname === to,
        [styles.isToday]: isToday,
      })}
      to={to}
      title={label}
    >
      {shortLabel}
    </Link>
  );
};

export default DateButton;
