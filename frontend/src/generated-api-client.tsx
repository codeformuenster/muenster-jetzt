/* Generated by restful-react */

import React from "react";
import { Get, GetProps, useGet, UseGetProps } from "restful-react";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

const encodingFn = encodeURIComponent;

const encodingTagFactory = (encodingFn: typeof encodeURIComponent) => (
  strings: TemplateStringsArray,
  ...params: (string | number | boolean)[]
) =>
  strings.reduce(
    (accumulatedPath, pathPart, idx) =>
      `${accumulatedPath}${pathPart}${
        idx < params.length ? encodingFn(params[idx]) : ""
      }`,
    ""
  );

const encode = encodingTagFactory(encodingFn);

export interface Event {
  id: number;
  /**
   * Web source from which event was scraped
   */
  source: EventSource;
  /**
   * Event ID used at source
   */
  sourceEventId: string;
  /**
   * Event details URL at source
   */
  sourceUrl?: string;
  /**
   * License under which source published event data
   */
  sourceLicense?: string;
  name: string;
  description: string;
  formattedDescription: string;
  url?: string;
  startDate: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  location: Location;
  performer?: string;
  /**
   * This field describes the mode of the event. Like some sort of category
   */
  mode?: string;
  organizer?: Organizer;
  images: EventImage[];
}

export interface EventImage {
  id: number;
  url: string;
  description?: string;
  source?: string;
}

export interface EventSource {
  id: number;
  name: string;
}

export interface EventsResponse {
  events: Event[];
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

export interface Location {
  id: number;
  description: string;
}

export interface Organizer {
  id: number;
  name: string;
}

export interface RootResponse {
  version: string;
}

export interface ValidationError {
  loc: string[];
  msg: string;
  type: string;
}

export type RootGetProps = Omit<
  GetProps<RootResponse, unknown, void, void>,
  "path"
>;

/**
 * Root
 *
 * Get the current version of the API
 */
export const RootGet = (props: RootGetProps) => (
  <Get<RootResponse, unknown, void, void> path={encode`/`} {...props} />
);

export type UseRootGetProps = Omit<
  UseGetProps<RootResponse, unknown, void, void>,
  "path"
>;

/**
 * Root
 *
 * Get the current version of the API
 */
export const useRootGet = (props: UseRootGetProps) =>
  useGet<RootResponse, unknown, void, void>(encode`/`, props);

export interface EventsEventsGetQueryParams {
  /**
   * Earliest start date
   */
  minDate?: string;
  /**
   * Latest start date
   */
  maxDate?: string;
  /**
   * Page number
   */
  page?: number;
  /**
   * Results per page
   */
  limit?: number;
}

export type EventsEventsGetProps = Omit<
  GetProps<
    EventsResponse,
    HTTPValidationError,
    EventsEventsGetQueryParams,
    void
  >,
  "path"
>;

/**
 * Events
 *
 * Retrieve events available in the API.
 */
export const EventsEventsGet = (props: EventsEventsGetProps) => (
  <Get<EventsResponse, HTTPValidationError, EventsEventsGetQueryParams, void>
    path={encode`/events`}
    {...props}
  />
);

export type UseEventsEventsGetProps = Omit<
  UseGetProps<
    EventsResponse,
    HTTPValidationError,
    EventsEventsGetQueryParams,
    void
  >,
  "path"
>;

/**
 * Events
 *
 * Retrieve events available in the API.
 */
export const useEventsEventsGet = (props: UseEventsEventsGetProps) =>
  useGet<EventsResponse, HTTPValidationError, EventsEventsGetQueryParams, void>(
    encode`/events`,
    props
  );
