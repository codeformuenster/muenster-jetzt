import { useEffect, useState, useMemo } from "react";
import { GetDataError } from "restful-react";
import {
  EventsResponse,
  Event,
  HTTPValidationError,
  EventsEventsGetQueryParams,
  useEventsEventsGet,
} from "../generated-api-client";

export interface IAugmentedEvent extends Event {
  start?: Date;
  end?: Date;
}

interface IUseGetEvents {
  (date?: string): {
    loading: boolean;
    error: GetDataError<HTTPValidationError> | null;
    events: IAugmentedEvent[] | null;
  };
}

const parseDate: (date: string, time?: string) => Date | undefined = (
  date,
  time = "00:00:00"
) => {
  try {
    return new Date(`${date}T${time}Z`);
  } catch (e) {
    return undefined;
  }
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
