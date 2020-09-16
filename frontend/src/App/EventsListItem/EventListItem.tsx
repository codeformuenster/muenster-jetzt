import React, { FC } from "react";
import { IAugmentedEvent } from "../../hooks/useGetEvents";
import styles from "./EventListItem.module.scss";
import ExternalLink from "../../Helpers/ExternalLink";

const EventsListItem: FC<IAugmentedEvent> = ({
  name,
  description,
  location,
  performer,
  externalUrl,
  formattedStart,
  formattedEnd,
  duration,
}) => {
  return (
    <div className={styles.eventlistItem}>
      <h2>
        {formattedStart}
        {formattedEnd ? <> – {formattedEnd}</> : ""}: {name}
      </h2>
      {performer && <p>{performer}</p>}
      <p>{description}</p>
      <p>
        {location.description} {duration && <> ({duration})</>}{" "}
        {externalUrl && (
          <ExternalLink href={externalUrl}>weitere Informationen</ExternalLink>
        )}
      </p>
    </div>
  );
};

export default EventsListItem;
