import React, { FC } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "./LandingPage.module.scss";

interface IBox {
  title: string;
  linkText: string;
  /* eslint-disable-next-line @typescript-eslint/ban-types */
  linkTo: string | object;
  target?: string;
  disabled?: boolean;
  preview?: boolean;
}

const Box: FC<IBox> = ({
  title,
  children,
  linkText,
  linkTo,
  disabled,
  preview,
  target,
}) => {
  return (
    <div className={styles.box}>
      <div
        className={clsx(styles.boxInner, {
          [styles.comingSoonBox]: disabled,
          [styles.previewBox]: preview,
        })}
      >
        <h2 className={styles.boxTitle}>{title}</h2>
        <div className={styles.boxBody}>{children}</div>
        <div className={styles.boxFooter}>
          <Link
            to={linkTo}
            target={target}
            className={clsx(styles.boxLink, {
              [styles.disabledBoxLink]: disabled,
            })}
          >
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Box;
