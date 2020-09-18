import React, { FC } from "react";
import { useLocation, useParams } from 'react-router-dom'
import "../../styles/base.scss";
import styles from "./Layout.module.scss";

import logo from "../../images/ms-jetzt-logo-icon.svg";

interface ILayout {
  hideHeader?: boolean;
}

const Layout: FC<ILayout> = ({ children, hideHeader }) => {
  const urlParams = useParams();
  // TODO: Gerald - types help
  const date = urlParams.date.split('-');
  const dayMonth = `${date[2]}.${date[1]}`;
  
  return (
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
  )
};

export default Layout;
