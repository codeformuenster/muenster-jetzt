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

  if (durationMs >= oneDay) {
    const days: number = Math.floor(durationMs / oneDay);

    if (days === 1) {
      return "ein Tag";
    }

    return `${days} Tage`;
  }

  if (durationMs >= oneHour) {
    const hours: number = Math.floor(durationMs / oneHour);

    if (hours === 1) {
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

export const isoFormat: (date: Date) => string = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

interface IFormatFunction {
  (date?: Date): string;
}

export const formatTime: IFormatFunction = (date) => {
  if (date) {
    const hours = `${date.getHours()}`.padStart(2, "0");
    const minutes = `${date.getMinutes()}`.padStart(2, "0");

    return `${hours}:${minutes}`;
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

  return new Date(year, month - 1, day, hour, minute || 0, second || 0, 0);
};
