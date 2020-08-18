import { useEffect, useState } from "react";
import { GetDataError } from "restful-react";
import {
  EventsResponse,
  Event,
  HTTPValidationError,
  useEventsEventsGet,
} from "../generated-api-client";

export interface IAugmentedEvent extends Event {
  start?: Date;
  end?: Date;
}

interface IUseGetEvents {
  (): {
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

const useGetEvents: IUseGetEvents = () => {
  const { loading, data, error } = useEventsEventsGet({
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
    if (data?.events) {
      setEvents(data.events as IAugmentedEvent[]);
    }
  }, [data]);

  return { loading, error, events };
};

export default useGetEvents;
