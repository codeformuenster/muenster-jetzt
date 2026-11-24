import { describe, expect, it } from "vitest";
import {
  apiInfoRoute,
  appDayRoute,
  appRootRoute,
  infoRootRoute,
  makeAppRouteLink,
} from "./routes";

describe("routes", () => {
  it("builds a link for a given day", () => {
    expect(makeAppRouteLink("2024-02-29")).toBe("/2024-02-29/");
  });

  it("falls back to the app root without a date", () => {
    expect(makeAppRouteLink()).toBe(appRootRoute);
    expect(appDayRoute).toBe("/:date(\\d{4}-\\d{2}-\\d{2})/");
  });

  it("exposes the info routes", () => {
    expect(infoRootRoute).toBe("/info/");
    expect(apiInfoRoute).toBe("/info/api/");
  });
});
