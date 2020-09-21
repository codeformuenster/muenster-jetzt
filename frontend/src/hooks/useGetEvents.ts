import { useEffect, useState, useMemo } from "react";
import { GetDataError } from "restful-react";
import {
  EventsResponse,
  Event,
  HTTPValidationError,
  EventsEventsGetQueryParams,
  useEventsEventsGet,
} from "../generated-api-client";
import { parseDate, formatTime, formatDuration } from "../utils/eventTime";

export interface IAugmentedEvent extends Event {
  start?: Date;
  end?: Date;

  duration: string;
  formattedStart: string;
  formattedEnd: string;

  externalUrl?: string;
}

export interface IUseGetEventsResult {
  loading: boolean;
  error: GetDataError<HTTPValidationError> | null;
  events: IAugmentedEvent[] | null;
}

interface IUseGetEvents {
  (date?: string): IUseGetEventsResult;
}

const augmentUrl: (url?: string) => string | undefined = (url) => {
  if (url) {
    return `${window.location.origin}/external/?url=${encodeURI(url)}`;
  }

  return undefined;
};

const useGetEvents: IUseGetEvents = (date) => {
  const queryParams = useMemo<EventsEventsGetQueryParams>(() => {
    if (!date) {
      return {};
    }

    return {
      minDate: date,
      maxDate: date,
    };
  }, [date]);

  const { loading, data, error } = useEventsEventsGet({
    queryParams,
    resolve: (responseData: EventsResponse) => {
      return {
        ...responseData,
        events: responseData.events.map((event) => {
          const start = parseDate(event.startDate, event.startTime);
          let end;
          if (event.endDate) {
            end = parseDate(event.endDate, event.endTime);
          }

          // try to parse dates
          return {
            ...event,
            start,
            end,
            formattedStart: formatTime(start),
            formattedEnd: formatTime(end),
            duration: formatDuration(start, end),
            externalUrl: augmentUrl(event.url),
          };
        }),
      };
    },
  });
  const [events, setEvents] = useState<IAugmentedEvent[] | null>(null);

  useEffect(() => {
    if (loading) {
      setEvents(null);
    } else if (data?.events) {
      setEvents(data.events as IAugmentedEvent[]);
    }
  }, [data, loading]);

  return { loading, error, events };
};

export default useGetEvents;
