import React, { FC, useState } from "react";
import { usePopper } from "react-popper";
import styles from "./Calendar.module.scss";
import CalendarBody from "./CalendarBody";

const Calendar: FC = () => {
  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, -70],
          },
        },
      ],
    }
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
      <button
        type="button"
        aria-label="Kalender öffnen"
        ref={setReferenceElement}
        onClick={() => setIsOpen(!isOpen)}
        className={styles.calendarButton}
      >
        &#128197;
      </button>

      {isOpen && (
        <div
          ref={setPopperElement}
          style={popperStyles.popper}
          {...attributes.popper}
          className={styles.calendarPopup}
        >
          <CalendarBody />
        </div>
      )}
    </>
  );
};

export default Calendar;
