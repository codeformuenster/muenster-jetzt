import React, { FC, useLayoutEffect } from "react";
import styles from "./KioskLayout.module.css";

import "purecss/build/base.css";
import "./variables.css";
import "./base.css";

const KioskLayout: FC = ({ children }) => {
  useLayoutEffect(() => {
    [
      ["html", styles.kioskLayout_html_body],
      ["body", styles.kioskLayout_html_body],
      ["#root", styles.kioskLayout_root],
    ].forEach(([selector, className]) => {
      const element = document.querySelector(selector);
      if (element) {
        element.classList.add(className);
      }
    });
  }, []);

  return <>{children}</>;
};

export default KioskLayout;
