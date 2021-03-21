/* Generated by restful-react */

import React from "react";
import { Get, GetProps, useGet, UseGetProps } from "restful-react";
export const SPEC_VERSION = "0.2.0";
export interface Event {
  id: number;
  /**
   * Event ID used at source
   */
  sourceEventId: string;
  /**
   * Event details URL at source
   */
  sourceUrl?: string | null;
  /**
   * License under which source published event data
   */
  sourceLicense?: string | null;
  /**
   * Event title
   */
  name: string;
  /**
   * Plain text event description and details
   */
  description?: string | null;
  /**
   * HTML event description and details (if available from source, otherwise matches plain text description). Will only contain these HTML tags: b, br, em, i, li, p, span, strong, ul.
   */
  formattedDescription?: string | null;
  /**
   * Event website
   */
  url?: string | null;
  /**
   * Start date as YYYY-MM-DD
   */
  startDate: string;
  /**
   * Start time as HH:MM:SS (optional)
   */
  startTime?: string | null;
  /**
   * Ende date as YYYY-MM-DD (optional)
   */
  endDate?: string | null;
  /**
   * End time as HH:MM:SS (optional)
   */
  endTime?: string | null;
  /**
   * Main event performer (e.g. speaker, band, etc.)
   */
  performer?: string | null;
  /**
   * Event mode (e.g. presentation, meetup, etc.)
   */
  mode?: string | null;
  source: {
    id: number;
    /**
     * Name of event source
     */
    name: string;
  };
  location: {
    id: number;
    /**
     * Description of event location (address or similar)
     */
    description: string;
  };
  organizer: {
    id: number;
    /**
     * Name of event organizer
     */
    name: string;
  };
  images: {
    id: number;
    url: string;
    description?: string | null;
    source?: string | null;
    event: number;
  }[];
}

export type ListEventsResponse = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Event[];
};

export interface ListEventsQueryParams {
  /**
   * A page number within the paginated result set.
   */
  page?: number;
  /**
   * Number of results to return per page.
   */
  limit?: number;
  /**
   * Location ID to filter events for
   */
  location?: string;
  /**
   * Organizer ID to filter events for
   */
  organizer?: string;
  /**
   * Earliest event start date
   */
  minDate?: string;
  /**
   * Latest event start date
   */
  maxDate?: string;
}

export type ListEventsProps = Omit<
  GetProps<
    ListEventsResponse,
    | {
        page?: string[];
        limit?: string[];
        location?: string[];
        organizer?: string[];
        minDate?: string[];
        maxDate?: string[];
      }
    | {
        detail: string;
      },
    ListEventsQueryParams,
    void
  >,
  "path"
>;

/**
 * Anfragen an die `/events` Schnittstelle geben die aktuell in der Datenbank
 * verfügbare Veranstaltungen zurück.
 */
export const ListEvents = (props: ListEventsProps) => (
  <Get<
    ListEventsResponse,
    | {
        page?: string[];
        limit?: string[];
        location?: string[];
        organizer?: string[];
        minDate?: string[];
        maxDate?: string[];
      }
    | {
        detail: string;
      },
    ListEventsQueryParams,
    void
  >
    path={`/events`}
    {...props}
  />
);

export type UseListEventsProps = Omit<
  UseGetProps<
    ListEventsResponse,
    | {
        page?: string[];
        limit?: string[];
        location?: string[];
        organizer?: string[];
        minDate?: string[];
        maxDate?: string[];
      }
    | {
        detail: string;
      },
    ListEventsQueryParams,
    void
  >,
  "path"
>;

/**
 * Anfragen an die `/events` Schnittstelle geben die aktuell in der Datenbank
 * verfügbare Veranstaltungen zurück.
 */
export const useListEvents = (props: UseListEventsProps) =>
  useGet<
    ListEventsResponse,
    | {
        page?: string[];
        limit?: string[];
        location?: string[];
        organizer?: string[];
        minDate?: string[];
        maxDate?: string[];
      }
    | {
        detail: string;
      },
    ListEventsQueryParams,
    void
  >(`/events`, props);

export interface RetrieveEventQueryParams {
  /**
   * Location ID to filter events for
   */
  location?: string;
  /**
   * Organizer ID to filter events for
   */
  organizer?: string;
  /**
   * Earliest event start date
   */
  minDate?: string;
  /**
   * Latest event start date
   */
  maxDate?: string;
}

export interface RetrieveEventPathParams {
  /**
   * A unique integer value identifying this event.
   */
  id: string;
}

export type RetrieveEventProps = Omit<
  GetProps<
    Event,
    | {
        id?: string[];
        location?: string[];
        organizer?: string[];
        minDate?: string[];
        maxDate?: string[];
      }
    | {
        detail: string;
      },
    RetrieveEventQueryParams,
    RetrieveEventPathParams
  >,
  "path"
> &
  RetrieveEventPathParams;

/**
 * Anfragen an die `/events` Schnittstelle geben die aktuell in der Datenbank
 * verfügbare Veranstaltungen zurück.
 */
export const RetrieveEvent = ({ id, ...props }: RetrieveEventProps) => (
  <Get<
    Event,
    | {
        id?: string[];
        location?: string[];
        organizer?: string[];
        minDate?: string[];
        maxDate?: string[];
      }
    | {
        detail: string;
      },
    RetrieveEventQueryParams,
    RetrieveEventPathParams
  >
    path={`/events/${id}`}
    {...props}
  />
);

export type UseRetrieveEventProps = Omit<
  UseGetProps<
    Event,
    | {
        id?: string[];
        location?: string[];
        organizer?: string[];
        minDate?: string[];
        maxDate?: string[];
      }
    | {
        detail: string;
      },
    RetrieveEventQueryParams,
    RetrieveEventPathParams
  >,
  "path"
> &
  RetrieveEventPathParams;

/**
 * Anfragen an die `/events` Schnittstelle geben die aktuell in der Datenbank
 * verfügbare Veranstaltungen zurück.
 */
export const useRetrieveEvent = ({ id, ...props }: UseRetrieveEventProps) =>
  useGet<
    Event,
    | {
        id?: string[];
        location?: string[];
        organizer?: string[];
        minDate?: string[];
        maxDate?: string[];
      }
    | {
        detail: string;
      },
    RetrieveEventQueryParams,
    RetrieveEventPathParams
  >((paramsInPath: RetrieveEventPathParams) => `/events/${paramsInPath.id}`, {
    pathParams: { id },
    ...props,
  });
