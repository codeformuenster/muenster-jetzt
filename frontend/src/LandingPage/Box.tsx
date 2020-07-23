import React, { FC } from "react";
import styles from "./LandingPage.module.scss";

interface IBox {
  title: string;
}

const Box: FC<IBox> = ({ title, children }) => {
  return (
    <div className={styles.box}>
      <h2 className={styles.boxTitle}>{title}</h2>
      {children}
    </div>
  );
};

export default Box;
