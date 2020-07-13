import React, { FC } from "react";
import styles from "./Layout.module.css";

const Layout: FC = ({ children }) => (
  <>
    <header className={styles.header}>Münster Jetzt</header>
    <section className={styles.mainSection}>{children}</section>
  </>
);

export default Layout;
