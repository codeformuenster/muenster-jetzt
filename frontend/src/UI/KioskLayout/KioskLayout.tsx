import React, { FC, useLayoutEffect } from "react";
import styles from "./KioskLayout.module.css";
import VersionString from "../VersionString/VersionString";

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

  return (
    <>
      {children}
      <VersionString className={styles.version} />
    </>
  );
};

export default KioskLayout;
