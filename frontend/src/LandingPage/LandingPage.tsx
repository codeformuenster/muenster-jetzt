import React, { FC } from "react";
import clsx from "clsx";

import Layout from "../UI/Layout/Layout";
import Box from "./Box";
import ExternalLink from "../Helpers/ExternalLink";

import styles from "./LandingPage.module.scss";

import logo from "../images/ms-jetzt-logo.svg";
import c4mLogo from "../images/logo_code4ms.png";
import githubLogo from "../images/logo_github.png";
import mshackLogo from "../images/logo_muensterhack.png";
import bahnLogo from "../images/logo_db_gobeta.svg";

const backendBasePath =
  process?.env?.REACT_APP_BACKEND_BASE_PATH || "http://localhost:8000";
const apiDocs = new URL("/docs", backendBasePath);

const LandingPage: FC = () => (
  <Layout hideHeader>
    <div className={styles.logoContainer}>
      <img src={logo} alt="Münster Jetzt" className={styles.logo} />
    </div>
    <div className={styles.welcomeText}>Alle Veranstaltungen im Überblick</div>
    <div className={styles.welcomeText2}>
      <div className={styles.maxWidthContainer}>
        <span className={clsx(styles.styledName, styles.styledNameBackground)}>
          Münster Jetzt
        </span>{" "}
        ist deine zentrale Anlaufstelle für alle Veranstaltungen in Münster.
        <br />
        Mit unserer App bist du immer bestens informiert. Die API bietet Zugriff
        auf maschinen&shy;lesbare Veranstaltungs&shy;informationen als Offene
        Daten.
      </div>
    </div>
    <div className={styles.row}>
      <Box title="App" linkText="Zur App" linkTo="/app" disabled>
        Mit der App verpasst du keine Veranstaltung mehr. Egal ob auf deinem
        Handy, Tablet oder Laptop, die{" "}
        <span className={styles.styledName}>Münster Jetzt</span> App ist einfach
        immer dabei.
      </Box>
      <Box
        title="API"
        linkText="Dokumentation"
        linkTo={{ pathname: apiDocs.href }}
        target="_blank"
        preview
      >
        Für Alle, die schnell und einfach maschinen&shy;lesbare
        Veranstaltungs&shy;informationen brauchen.
      </Box>
      <Box title="Kiosk" linkText="zur Kiosk-Ansicht" linkTo="/kiosk" preview>
        Die Kiosk-Ansicht ist für große Displays geeignet und zeigt
        Informationen zu ausgewählten Veranstaltungen.
      </Box>
    </div>
    <div className={styles.row}>
      <div className={styles.actionColumn}>
        <h3 className={styles.rowTitle}>Datenquellen</h3>
        <p>
          <ul className={styles.dataSources}>
            <li>
              <span role="img" aria-label="Häkchen">
                ✅
              </span>
              Münster Jetzt
            </li>
            <li>
              <span role="img" aria-label="Häkchen">
                ✅
              </span>
              <a
                href="https://www.muensterland.digital/api"
                target="_blank"
                rel="noopener noreferrer"
              >
                münsterLand.digital
              </a>
            </li>
            <li>
              <span role="img" aria-label="Häkchen">
                ✅
              </span>
              <a
                href="https://www.datenportal-muensterland.de"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datenportal Münsterland (Münsterland e.V.)
              </a>
            </li>
          </ul>
          <br />
        </p>
      </div>
    </div>
    <div className={styles.row}>
      <div className={styles.actionColumn}>
        <h3 className={styles.rowTitle}>
          Verbesserungsvorschläge oder fehlende Veranstaltungen?
        </h3>
        <p className={styles.contactText}>
          Das wichtigste Ziel von{" "}
          <span className={styles.styledName}>Münster Jetzt</span>: App und API
          so benutzerfreundlich wie möglich gestalten und alle
          Veranstaltungskalender vereinen.
        </p>
        <a
          href="mailto:muenster-jetzt@codeformuenster.org?subject=Hallo"
          className={styles.contactLink}
        >
          Kontakt aufnehmen
        </a>
      </div>
    </div>
    <div className={styles.row}>
      <div className={styles.projectPlanHeader}>
        <h3 className={styles.rowTitle}>Projektplan</h3>
      </div>
      <div className={styles.projectPlanColumn}>
        <h5 className={styles.projectPlanTitle}>App &amp; API</h5>
        <p className={styles.projectPlanText}>
          Bereits auf dem{" "}
          <ExternalLink href="https://muensterhack.de/">
            MÜNSTERHACK 2019
          </ExternalLink>{" "}
          wurden die ersten Grundsteine für{" "}
          <span className={styles.styledName}>Münster Jetzt</span> gelegt. Wir
          hatten versprochen, bis zur kommenden Ausgabe des MÜNSTERHACK (2020),
          eine einfache und offene API für Veranstaltungsinformationen in
          Münster zu liefern.
          <br />
          Wenn alles klappt, wird es bis dahin so weit sein!
        </p>
      </div>
      <div className={styles.projectPlanColumn}>
        <h5 className={styles.projectPlanTitle}>Kiosk</h5>
        <p className={styles.projectPlanText}>
          Im Rahmen des Projekts{" "}
          <ExternalLink href="https://gobeta.de/projekte/bahnhof-muenster/">
            Zukunftsbahnhof Münster
          </ExternalLink>{" "}
          entwickeln wir speziell für große Displays eine Kiosk-Ansicht.
          <br />
          Weitere Informationen auf{" "}
          <ExternalLink href="https://gobeta.de/projekte/muenster-jetzt/">
            gobeta.de
          </ExternalLink>
          .
        </p>
      </div>
    </div>
    <div className={styles.row}>
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
    </div>
  </Layout>
);

export default LandingPage;
