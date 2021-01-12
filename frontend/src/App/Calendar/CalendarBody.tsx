import React, { FC, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clsx from "clsx";
import styles from "./Calendar.module.scss";
import { isoFormat } from "../../utils/eventTime";
import { makeAppRouteLink } from "../../utils/routes";

interface ICalendarBody {
  close: () => void;
}

interface IDate {
  label: string;
  to: string;
  isToday: boolean;
  isSelected: boolean;
  isoDate: string;
}

const weekdayShortFormat = new Intl.DateTimeFormat("de-DE", {
  weekday: "short",
});

const monthDateFormat = new Intl.DateTimeFormat("de-DE", {
  month: "long",
  year: "numeric",
}).format;

const CalendarBody: FC<ICalendarBody> = ({ close }) => {
  const { date: selectedDateFromParams } = useParams<IAppRouterParams>();

  const [baseDate, setBaseDate] = useState<Date>(
    // initialize baseDate as a Date with all fields reset
    // except year and month
    (() => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      now.setDate(1);

      return now;
    })()
  );

  const setBaseDateMonth: (month: number) => void = (month) => {
    const newBaseDate = new Date(baseDate.getTime());
    newBaseDate.setMonth(newBaseDate.getMonth() + month);

    setBaseDate(newBaseDate);
  };

  const dates = useMemo<IDate[]>(() => {
    // take the current baseDate as starting point
    const firstOfMonth = new Date(baseDate.getTime());
    const today = isoFormat(new Date());

    // determine number of days in month
    // stolen from date-fns getDaysInMonths
    const year = firstOfMonth.getFullYear();
    const monthIndex = firstOfMonth.getMonth();
    const lastDayOfMonth = new Date(0);
    lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
    lastDayOfMonth.setHours(0, 0, 0, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();

    return Array.from({ length: numDaysInMonth }, (_, i) => {
      // mutate the date. otherwise we'll get problems in month
      // where summer/winter time is switched
      firstOfMonth.setDate(i + 1);
      const isoDate = isoFormat(firstOfMonth);

      return {
        label: weekdayShortFormat.format(firstOfMonth),
        to: makeAppRouteLink(isoDate),
        isToday: today === isoDate,
        isSelected: selectedDateFromParams === isoDate,
        isoDate,
      };
    });
  }, [baseDate, selectedDateFromParams]);

  return (
    <div className={styles.calendar}>
      <span
        aria-hidden
        role="button"
        onClick={() => close()}
        className={styles.close}
      >
        &times;
      </span>
      <div className={styles.monthRow}>
        <span
          aria-hidden
          role="button"
          onClick={() => setBaseDateMonth(-1)}
          className={styles.prevMonth}
        >
          &lt;
        </span>
        <div className={styles.monthIndicator}>
          <time dateTime={isoFormat(baseDate)}>
            {monthDateFormat(baseDate)}
          </time>
        </div>
        <span
          aria-hidden
          role="button"
          onClick={() => setBaseDateMonth(1)}
          className={styles.nextMonth}
        >
          &gt;
        </span>
      </div>
      <div className={styles.dayOfWeek}>
        <div>Mo</div>
        <div>Di</div>
        <div>Mi</div>
        <div>Do</div>
        <div>Fr</div>
        <div>Sa</div>
        <div>So</div>
      </div>
      <div className={styles.dateGrid}>
        {dates.map((date, i) => (
          <Link
            key={date.isoDate}
            to={date.to}
            data-dow={date.label}
            className={clsx(styles.date, {
              [styles.isToday]: date.isToday,
              [styles.isActive]: date.isSelected,
            })}
          >
            <time dateTime={date.isoDate}>{i + 1}</time>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CalendarBody;
