import React, { FC } from "react";
import styles from "./EventList.module.scss"

import EventsListItem from "../EventsListItem/EventListItem";
import { IAugmentedEvent } from "../../hooks/useGetEvents";

interface IEventsList {
  events: IAugmentedEvent[];
}

const EventsList: FC<IEventsList> = ({ events }) => {
  return (
    <div className={styles.eventList}>
      {events.length === 0 && <p>Hier scheint heute nix los</p>}
      {events.map((e) => (
        <EventsListItem key={e.id} {...e} />
      ))}
    </div>
  );
};

export default EventsList;
