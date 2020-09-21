import React, { FC } from "react";
import styles from "./EventList.module.scss";

import EventsListItem from "../EventsListItem/EventListItem";
import { IUseGetEventsResult } from "../../hooks/useGetEvents";
import LoadingEventListItem from "../EventsListItem/LoadingEventListItem";

const EventsList: FC<IUseGetEventsResult> = ({ events, loading, error }) => {
  const empty = events !== null && events.length === 0;

  if (loading || error || empty) {
    return (
      <div className={styles.eventList}>
        <LoadingEventListItem error={error} loading={loading} empty={empty} />
      </div>
    );
  }

  return (
    <div className={styles.eventList}>
      {events?.map((e) => (
        <EventsListItem key={e.id} {...e} />
      ))}
    </div>
  );
};

export default EventsList;
