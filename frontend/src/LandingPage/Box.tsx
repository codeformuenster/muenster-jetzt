import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.scss";

interface IBox {
  title: string;
  linkText: string;
  linkTo: string;
}

const Box: FC<IBox> = ({ title, children, linkText, linkTo }) => {
  return (
    <div className={styles.box}>
      <div className={styles.boxInner}>
        <h2 className={styles.boxTitle}>{title}</h2>
        <div className={styles.boxBody}>{children}</div>
        <div className={styles.boxFooter}>
          <Link to={linkTo} className={styles.boxLink}>
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Box;
