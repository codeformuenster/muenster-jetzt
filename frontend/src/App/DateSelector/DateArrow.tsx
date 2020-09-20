import React, { FC } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./DateArrow.module.scss";

export enum Direction {
  Right,
  Left,
}

interface IDateArrow {
  direction: Direction;
  to: string;
}

const DateArrow: FC<IDateArrow> = ({ direction, to }) => {
  return (
    <Link
      to={to}
      className={clsx(
        styles.dateArrow,
        direction === Direction.Right ? styles.right : styles.left
      )}
    />
  );
};

export default DateArrow;
