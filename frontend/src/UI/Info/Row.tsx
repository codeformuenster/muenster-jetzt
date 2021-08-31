import React, { FC } from "react";
import styles from "./Info.module.scss";

interface IRowProps {
  singleColumnClassName?: string;
  rowTitle?: string;
}

const Row: FC<IRowProps> = ({ children, singleColumnClassName, rowTitle }) => {
  if (singleColumnClassName) {
    return (
      <div className={styles.row}>
        <div className={singleColumnClassName}>
          {rowTitle && <h3 className={styles.rowTitle}>{rowTitle}</h3>}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.row}>
      {rowTitle && <h3 className={styles.rowTitle}>{rowTitle}</h3>}
      {children}
    </div>
  );
};

Row.defaultProps = {
  singleColumnClassName: undefined,
  rowTitle: undefined,
};

export default Row;
