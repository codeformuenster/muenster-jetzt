import { useEffect, useState, useMemo } from "react";
import { GetDataError } from "restful-react";
import {
  ListEventsResponse,
  Event,
  ListEventsQueryParams,
  useListEvents,
} from "../generated-api-client";
import { parseDate, formatTime, formatDuration } from "../utils/eventTime";

interface HTTPValidationError {
  page?: string[];
  limit?: string[];
  location?: string[];
  organizer?: string[];
  minDate?: string[];
  maxDate?: string[];
}

interface HTTPNotFoundError {
  detail: string;
}

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
  error: GetDataError<HTTPValidationError | HTTPNotFoundError> | null;
  events: IAugmentedEvent[] | null;
}

interface IUseGetEvents {
  (date?: string): IUseGetEventsResult;
}

const augmentUrl: (url?: string | null) => string | undefined = (url) => {
  if (url) {
    return `${window.location.origin}/external/?url=${encodeURI(url)}`;
  }

  return undefined;
};

const useGetEvents: IUseGetEvents = (date) => {
  const queryParams = useMemo<ListEventsQueryParams>(() => {
    if (!date) {
      return {};
    }

    return {
      minDate: date,
      maxDate: date,
    };
  }, [date]);

  const { loading, data, error } = useListEvents({
    queryParams,
    resolve: (responseData: ListEventsResponse) => {
      return {
        ...responseData,
        results: responseData.results
          ? responseData.results.map((event) => {
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
            })
          : undefined,
      };
    },
  });
  const [events, setEvents] = useState<IAugmentedEvent[] | null>(null);

  useEffect(() => {
    if (loading) {
      setEvents(null);
    } else if (data?.results) {
      setEvents(data.results as IAugmentedEvent[]);
    }
  }, [data, loading]);

  return { loading, error, events };
};

export default useGetEvents;
