import React, { FC } from "react";
import clsx from "clsx";
import styles from "./EventListItem.module.scss";
import { IUseGetEventsResult } from "../../hooks/useGetEvents";

interface ILoadingEventListItem extends Omit<IUseGetEventsResult, "events"> {
  empty: boolean;
}

const LoadingEventListItem: FC<ILoadingEventListItem> = ({
  loading,
  error,
  empty,
}) => {
  if (!loading && !error && !empty) {
    return null;
  }

  return (
    <div className={clsx(styles.centeredItem)}>
      {(() => {
        switch (true) {
          case empty:
            return <h2>Keine Veranstaltungen gefunden.</h2>;
          case loading:
            return <h2>Veranstaltungen werden geladen&hellip;</h2>;
          case Boolean(error):
            return (
              <h2>
                Fehler beim laden von Veranstaltungen
                {error ? `(${error.message}` : ""}
              </h2>
            );
          default:
            return <h2>¯\_(ツ)_/¯</h2>;
        }
      })()}
    </div>
  );
};

export default LoadingEventListItem;
