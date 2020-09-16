import React, { FC } from "react";
import styles from "./EventListItem.module.scss";

const LoadingEventListItem: FC = () => (
  <div className={styles.eventlistItem}>
    <h2>Veranstaltungen werden geladen&hellip;</h2>
  </div>
);

export default LoadingEventListItem;
