import React, { FC } from "react";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import de from "timeago.js/lib/lang/de";

interface IRelativeTime {
  datetime?: Date;
}

timeago.register("de", de);

const RelativeTime: FC<IRelativeTime> = ({ datetime }) => {
  if (!datetime) {
    return null;
  }

  return <TimeAgo locale="de" datetime={datetime} />;
};

RelativeTime.defaultProps = {
  datetime: undefined,
};

export default RelativeTime;
