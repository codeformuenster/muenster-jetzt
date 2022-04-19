import React, { FC } from "react";
import { Interweave } from "interweave";
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
}) => {
  return (
    <div className={styles.eventListItem}>
      <div className={styles.eventInfoWrapper}>
        <div className={styles.eventInfoTitleRow}>
          <h3 className={styles.eventInfoTitle}>{name}</h3>
        </div>
        <div className={styles.iconContainer}>
          <span role="img" aria-label="Uhr">
            📍
          </span>
          {location.description}
        </div>
        <div className={styles.iconContainer}>
          <span role="img" aria-label="Uhr">
            🕙
          </span>
          {formattedStart}
          {formattedEnd ? <> – {formattedEnd}</> : ""}
        </div>
        <div className={styles.eventInfoDescriptionContainer}>
          <div className={styles.descriptionUpperRow}>
            {performer && <p>{performer}</p>}
            <p className={styles.eventDescription}>
              <Interweave content={description} />
            </p>
          </div>
          <div className={styles.descriptionBottomRow}>
            <div className={styles.extraLinkContainer}>
              {externalUrl && (
                <ExternalLink href={externalUrl}>
                  weitere Informationen
                </ExternalLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsListItem;
