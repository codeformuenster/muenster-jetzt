import { describe, expect, it } from "vitest";
import {
  formatDuration,
  formatTime,
  isoFormat,
  oneDay,
  parseDate,
} from "./eventTime";

describe("parseDate", () => {
  it("parses a date with a time", () => {
    const date = parseDate("2024-02-29", "13:45:10");

    expect(date?.getFullYear()).toBe(2024);
    expect(date?.getMonth()).toBe(1);
    expect(date?.getDate()).toBe(29);
    expect(date?.getHours()).toBe(13);
    expect(date?.getMinutes()).toBe(45);
    expect(date?.getSeconds()).toBe(10);
  });

  it("uses midnight when no time is given", () => {
    const date = parseDate("2024-03-01");

    expect(date?.getHours()).toBe(0);
    expect(date?.getMinutes()).toBe(0);
  });
});

describe("formatTime", () => {
  it("formats a date as hours and minutes", () => {
    expect(formatTime(parseDate("2024-02-29", "13:45"))).toBe("13:45");
  });

  it("returns an empty string without a date", () => {
    expect(formatTime()).toBe("");
  });
});

describe("isoFormat", () => {
  it("formats a date as year-month-day", () => {
    expect(isoFormat(new Date(2024, 1, 29))).toBe("2024-02-29");
  });
});

describe("formatDuration", () => {
  it("returns an empty string for missing or short durations", () => {
    const start = new Date(0);

    expect(formatDuration()).toBe("");
    expect(formatDuration(start, new Date(start.getTime() + 60000))).toBe("");
  });

  it("formats minutes, hours and days", () => {
    const start = new Date(0);
    const after = (ms: number) => new Date(start.getTime() + ms);

    expect(formatDuration(start, after(20 * 60000))).toBe("20 Minuten");
    expect(formatDuration(start, after(60 * 60000))).toBe("eine Stunde");
    expect(formatDuration(start, after(2 * 60 * 60000))).toBe("2 Stunden");
    expect(formatDuration(start, after(oneDay))).toBe("ein Tag");
    expect(formatDuration(start, after(2 * oneDay))).toBe("2 Tage");
  });
});
