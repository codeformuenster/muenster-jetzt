import React, { FC } from "react";
import { IAugmentedEvent } from "../../hooks/useGetEvents";

const EventsListItem: FC<IAugmentedEvent> = ({
  id,
  name,
  description,
  start,
}) => {
  return (
    <div>
      <h2>
        {id}: {name} ({start && start.toISOString()})
      </h2>
      <p>{description}</p>
    </div>
  );
};

export default EventsListItem;
