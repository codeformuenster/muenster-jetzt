const oneMinute = 1000 * 60;
const tenMinutes = oneMinute * 10;
const oneHour = tenMinutes * 6;
const oneDay = oneHour * 24;

interface IFormatDuration {
  (start?: Date, end?: Date): string;
}

export const formatDuration: IFormatDuration = (start, end) => {
  let durationMs = 0;

  if (start && end) {
    durationMs = end.getTime() - start.getTime();
  }

  if (durationMs > oneDay) {
    const days: number = Math.floor(durationMs / oneDay);

    if (days >= 1) {
      return "ein Tag";
    }

    return `${days} Tage`;
  }

  if (durationMs >= oneHour) {
    const hours: number = Math.floor(durationMs / oneHour);

    if (hours >= 1) {
      return "eine Stunde";
    }

    return `${hours} Stunden`;
  }

  if (durationMs >= tenMinutes) {
    const minutes = Math.floor(durationMs / oneMinute);

    if (minutes >= 10) {
      return `${minutes} Minuten`;
    }
  }

  return "";
};

export const formatTime = new Intl.DateTimeFormat("de-DE", {
  hour: "2-digit",
  minute: "2-digit",
}).format;

interface IParseDate {
  (date: string, time?: string): Date | undefined;
}

export const parseDate: IParseDate = (date, time = "00:00:00") => {
  try {
    return new Date(`${date}T${time}Z`);
  } catch (e) {
    return undefined;
  }
};
