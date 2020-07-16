import React, { FC } from "react";
import VersionString from "../VersionString/VersionString";

import styles from "./Layout.module.css";

const Layout: FC = ({ children }) => (
  <>
    <header className={styles.header}>Münster Jetzt</header>
    <section className={styles.mainSection}>{children}</section>
    <VersionString />
  </>
);

export default Layout;
