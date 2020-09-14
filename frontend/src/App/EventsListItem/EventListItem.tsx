import React, { FC } from "react";
import { IAugmentedEvent } from "../../hooks/useGetEvents";
import RelativeTime from "../../Helpers/RelativeTime";
import styles from "./EventListItem.module.scss";

const EventsListItem: FC<IAugmentedEvent> = ({
  id,
  name,
  description,
  start,
}) => {
  return (
    <div className={styles.eventlistItem}>
      <h2>
        {id}: {name} (<RelativeTime datetime={start} />)
      </h2>
      <p>{description}</p>
    </div>
  );
};

export default EventsListItem;
