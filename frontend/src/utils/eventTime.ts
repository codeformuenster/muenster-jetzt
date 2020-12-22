const oneMinute = 1000 * 60;
const tenMinutes = oneMinute * 10;
const oneHour = tenMinutes * 6;
export const oneDay = oneHour * 24;

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

const hhmmTimeFormat = new Intl.DateTimeFormat("de-DE", {
  hour: "2-digit",
  minute: "2-digit",
}).format;

// let's hope sweden never changes its date format
// https://stackoverflow.com/a/58633686
export const isoFormat: (date: Date) => string = (date) =>
  date.toLocaleDateString("sv-SE");

interface IFormatFunction {
  (date?: Date): string;
}

export const formatTime: IFormatFunction = (date) => {
  if (date) {
    return hhmmTimeFormat(date);
  }

  return "";
};

interface IParseDate {
  (date: string, time?: string | null): Date | undefined;
}

export const parseDate: IParseDate = (date, time) => {
  const dateParts = date.split("-");
  const [year, month, day] = dateParts.map((d) => parseInt(d, 10));

  if (!time) {
    return new Date(year, month - 1, day, 0, 0, 0, 0);
  }

  const timeParts = time.split(":");
  const [hour, minute, second] = timeParts.map((d) => parseInt(d, 10));

  return new Date(year, month - 1, day, hour, minute, second, 0);
};
