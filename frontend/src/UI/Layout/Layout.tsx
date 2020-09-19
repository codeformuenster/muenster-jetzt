import React, { FC } from "react";
import { useLocation, useParams } from 'react-router-dom'
import "../../styles/base.scss";
import styles from "./Layout.module.scss";

import logo from "../../images/ms-jetzt-logo-icon.svg";

interface ILayout {
  hideHeader?: boolean;
  dayMonth?: string;
}

const Layout: FC<ILayout> = ({ children, hideHeader, dayMonth }) => (
  <>
    {!hideHeader && (
      <header className={styles.header}>
        <img src={logo} alt="Münster Jetzt" className={styles.logo} />
        <div>
          <h4 className={styles.title}>Veranstaltungen am {dayMonth}</h4>
        </div>
      </header>
    )}
    <section className={styles.mainSection}>
      <div className={styles.container}>{children}</div>
    </section>
  </>
);

export default Layout;
