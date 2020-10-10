import React, { FC } from "react";
import Row from "./Row";
import styles from "./Info.module.scss";
import ExternalLink from "../../Helpers/ExternalLink";
import mshackLogo from "../../images/logo_muensterhack.png";
import githubLogo from "../../images/logo_github.png";
import c4mLogo from "../../images/logo_code4ms.png";
import bahnLogo from "../../images/logo_db_gobeta.svg";

const Footer: FC = () => (
  <Row>
    <div className={styles.footerItem}>
      <small>&nbsp;</small>
      <ExternalLink href="https://muensterhack.de">
        <img
          src={mshackLogo}
          alt="MÜNSTERHACK 2019 Logo"
          className={styles.footerItemImg}
        />
      </ExternalLink>
      <small>
        Gestartet auf dem{" "}
        <ExternalLink
          className={styles.footerItemLink}
          href="https://muensterhack.de/"
        >
          MÜNSTERHACK 2019
        </ExternalLink>
      </small>
    </div>
    <div className={styles.footerItem}>
      <small>&nbsp;</small>
      <img
        src={githubLogo}
        alt="GitHub Logo - Link zum Repository muenster-jetzt"
        className={styles.footerItemImg}
      />
      <small>
        Freie und Offene Software. Quellcode auf{" "}
        <ExternalLink
          className={styles.footerItemLink}
          href="https://github.com/codeformuenster/muenster-jetzt/"
        >
          GitHub
        </ExternalLink>
      </small>
    </div>
    <div className={styles.footerItem}>
      <small>Ein Projekt von</small>
      <ExternalLink href="https://codeformuenster.org/">
        <img
          src={c4mLogo}
          alt="Code for Münster Logo"
          className={styles.footerItemImg}
        />
      </ExternalLink>
      <small>
        <ExternalLink
          className={styles.footerItemLink}
          href="https://codeformuenster.org/impressum/#impressum"
        >
          Impressum
        </ExternalLink>{" "}
        &amp;{" "}
        <ExternalLink
          className={styles.footerItemLink}
          href="https://codeformuenster.org/impressum/#datenschutz"
        >
          Datenschutz
        </ExternalLink>
      </small>
    </div>
    <div className={styles.footerItem}>
      <small>&nbsp;</small>
      <ExternalLink href="https://gobeta.de/projekte/bahnhof-muenster/">
        <img
          src={bahnLogo}
          alt="Zukunftsbahnhof Münster"
          className={styles.footerItemImg}
        />
      </ExternalLink>
      <small>
        Teil des{" "}
        <ExternalLink
          className={styles.footerItemLink}
          href="https://gobeta.de/projekte/bahnhof-muenster/"
        >
          Zukunftsbahnhof Münster
        </ExternalLink>
      </small>
    </div>
  </Row>
);

export default Footer;
