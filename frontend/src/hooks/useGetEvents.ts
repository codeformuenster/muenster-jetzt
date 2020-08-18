import { useEffect, useState } from "react";
import { GetDataError } from "restful-react";
import {
  EventsResponse,
  Event,
  HTTPValidationError,
  useEventsEventsGet,
} from "../generated-api-client";

export interface IAugmentedEvent extends Event {
  start: Date;
  end: Date;
}

interface IUseGetEvents {
  (): {
    loading: boolean;
    error: GetDataError<HTTPValidationError> | null;
    events: IAugmentedEvent[] | null;
  };
}

const useGetEvents: IUseGetEvents = () => {
  const { loading, data, error } = useEventsEventsGet({
    resolve: (responseData: EventsResponse) => {
      return {
        ...responseData,
        events: responseData.events.map((event) => ({
          ...event,
          start: new Date(),
          end: new Date(),
        })),
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
