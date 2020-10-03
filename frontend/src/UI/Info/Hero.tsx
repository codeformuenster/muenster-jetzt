import React, { FC } from "react";
import styles from "./Info.module.scss";
import logo from "../../images/ms-jetzt-logo.svg";

interface IHeroProps {
  subtitle: string;
}

const Hero: FC<IHeroProps> = ({ children, subtitle }) => (
  <>
    <div className={styles.logoContainer}>
      <img src={logo} alt="Münster Jetzt" className={styles.logo} />
    </div>
    <div className={styles.heroText}>{subtitle}</div>
    <div className={styles.heroText2}>
      <div className={styles.maxWidthContainer}>{children}</div>
    </div>
  </>
);

export default Hero;
