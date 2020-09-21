import React, { FC, ReactNode } from "react";
import "../../styles/base.scss";
import styles from "./Layout.module.scss";

import logo from "../../images/ms-jetzt-logo-icon.svg";
import Nav from "../Nav/Nav";

interface ILayout {
  hideHeader?: boolean;
  header?: ReactNode;
}

const Layout: FC<ILayout> = ({ children, hideHeader, header }) => (
  <>
    {!hideHeader && (
      <header className={styles.header}>
        <img src={logo} alt="Münster Jetzt" className={styles.logo} />
        <div className={styles.titleContainer}>{header}</div>
        <Nav />
      </header>
    )}
    <section className={styles.mainSection}>
      <div className={styles.container}>{children}</div>
    </section>
  </>
);

export default Layout;
