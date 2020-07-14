import React, { FC, useLayoutEffect } from "react";
import styles from "./KioskLayout.module.css";

const KioskLayout: FC = ({ children }) => {
  useLayoutEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.classList.add(styles.kioskLayout);
    }
  }, []);

  return <>{children}</>;
};

export default KioskLayout;
