import React, { FC } from "react";
import VersionString from "../VersionString/VersionString";

import "../../styles/base.scss";
import styles from "./Layout.module.scss";

import logo from "../../images/ms-jetzt-logo.svg";

const Layout: FC = ({ children }) => (
  <>
    <header className={styles.header}>
      <img src={logo} alt="Münster Jetzt" className={styles.logo} />
    </header>
    <section className={styles.mainSection}>{children}</section>
    <VersionString />
  </>
);

export default Layout;
