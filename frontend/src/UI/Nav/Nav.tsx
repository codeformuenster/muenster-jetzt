import React, { FC, useState } from "react";
import { usePopper } from "react-popper";
import { Link } from "react-router-dom";

import styles from "./Nav.module.scss";
import { apiInfoRoute, infoRootRoute } from "../../utils/routes";
import ExternalLink from "../../Helpers/ExternalLink";

const Nav: FC = () => {
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
            offset: [10, 5],
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
        aria-label="Navigation öffnen"
        ref={setReferenceElement}
        onClick={() => setIsOpen(!isOpen)}
        className={styles.navToggle}
      >
        &#9776;
      </button>

      {isOpen && (
        <div
          ref={setPopperElement}
          style={popperStyles.popper}
          {...attributes.popper}
          className={styles.navMenu}
        >
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to={infoRootRoute}>Info</Link>
            </li>
            <li className={styles.navItem}>
              <Link to={apiInfoRoute}>API</Link>
            </li>
            <li className={styles.divider} />
            <li className={styles.navItem}>
              <ExternalLink href="https://codeformuenster.org/impressum#impressum">
                Impressum
              </ExternalLink>
            </li>
            <li className={styles.navItem}>
              <ExternalLink href="https://codeformuenster.org/impressum#datenschutz">
                Datenschutz
              </ExternalLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Nav;
