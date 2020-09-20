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
    <div className={styles.eventListItem}>
      <div className={styles.eventInfoWrapper}>
        <div className={styles.eventInfoTitleRow}>
          <h3 className={styles.eventInfoTitle}>{name}</h3>
          <h4 className={styles.eventInfoLocation}>{location.description}</h4>
        </div>
        <div className={styles.eventInfoDescriptionContainer}>
          <div className={styles.descriptionUpperRow}>
            {performer && <p>{performer}</p>}
            <p>{description}</p>
          </div>
          <div className={styles.descriptionBottomRow}>
            <div className={styles.extraLinkContainer}>
              {externalUrl && (
                <ExternalLink href={externalUrl}>
                  weitere Informationen
                </ExternalLink>
              )}
            </div>
            <div className={styles.timeContainer}>
              <span>
                {formattedStart}
                {formattedEnd ? <> – {formattedEnd}</> : ""}
              </span>
              <span>{duration ? <>({duration})</> : ""}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsListItem;
