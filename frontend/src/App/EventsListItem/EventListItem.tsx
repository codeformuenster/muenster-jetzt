import React, { FC } from "react";
import { IAugmentedEvent } from "../../hooks/useGetEvents";
import RelativeTime from "../../Helpers/RelativeTime";

const EventsListItem: FC<IAugmentedEvent> = ({
  id,
  name,
  description,
  start,
}) => {
  return (
    <div>
      <h2>
        {id}: {name} (<RelativeTime datetime={start} />)
      </h2>
      <p>{description}</p>
    </div>
  );
};

export default EventsListItem;
