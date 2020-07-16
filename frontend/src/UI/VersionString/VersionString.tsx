import React, { FC, HTMLAttributes } from "react";
import styles from "./VersionString.module.css";

const VersionString: FC<HTMLAttributes<HTMLSpanElement>> = ({ className }) => (
  <span className={[className, styles.version].join(" ")}>
    {process?.env?.REACT_APP_VERSION || "unknown development build"}
  </span>
);

export default VersionString;
