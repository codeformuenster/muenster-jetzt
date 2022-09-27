import React, { FC, ReactNode, PropsWithChildren } from "react";
import "../../styles/base.scss";
import styles from "./Layout.module.scss";

import logo from "../../images/ms-jetzt-logo-icon.svg";
import Nav from "../Nav/Nav";

interface ILayout extends PropsWithChildren<unknown> {
  header?: ReactNode;
}

const Layout: FC<ILayout> = ({ children, header }) => (
  <>
    <header className={styles.header}>
      <img src={logo} alt="Münster Jetzt" className={styles.logo} />
      <div className={styles.titleContainer}>{header}</div>
      <Nav />
    </header>
    <section className={styles.mainSection}>
      <div className={styles.container}>{children}</div>
    </section>
  </>
);

Layout.defaultProps = {
  header: null,
};

export default Layout;
