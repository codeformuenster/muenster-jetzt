import React, { FC } from "react";

import "../../styles/base.scss";
import styles from "./Layout.module.scss";

import logo from "../../images/ms-jetzt-logo.svg";

interface ILayout {
  hideHeader?: boolean;
}

const Layout: FC<ILayout> = ({ children, hideHeader }) => (
  <>
    {!hideHeader && (
      <header className={styles.header}>
        <img src={logo} alt="Münster Jetzt" className={styles.logo} />
      </header>
    )}
    <section className={styles.mainSection}>
      <div className={styles.container}>{children}</div>
    </section>
  </>
);

export default Layout;
