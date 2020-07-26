import React, { FC } from "react";
import clsx from "clsx";

import Layout from "../UI/Layout/Layout";
import Box from "./Box";

import styles from "./LandingPage.module.scss";

import logo from "../images/ms-jetzt-logo.svg";
import c4mLogo from "../images/logo_code4ms.png";
import githubLogo from "../images/logo_github.png";
import mshackLogo from "../images/logo_muensterhack.png";

const LandingPage: FC = () => (
  <Layout hideHeader>
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Münster Jetzt" className={styles.logo} />
      </div>
      <div className={styles.welcomeText}>
        Alle Veranstaltungen im Überblick
      </div>
      <div className={styles.welcomeText2}>
        <div className={styles.maxWidthContainer}>
          <span
            className={clsx(styles.styledName, styles.styledNameBackground)}
          >
            Münster Jetzt
          </span>{" "}
          ist deine zentrale Anlaufstelle für alle Veranstaltungen in Münster.
          <br />
          Mit unserer App bist du immer bestens informiert. Die API bietet
          Zugriff auf maschinen&shy;lesbare Veranstaltungs&shy;informationen als
          Offene Daten.
        </div>
      </div>
      <div className={styles.boxes}>
        <Box title="App" linkText="Bald" linkTo="/app" disabled>
          Mit der App verpasst du keine Veranstaltung mehr. Egal ob auf deinem
          Handy, Tablet oder Laptop, die{" "}
          <span className={styles.styledName}>Münster Jetzt</span> App ist
          einfach immer dabei.
        </Box>
        <Box title="API" linkText="Bald" linkTo="/api-docs" disabled>
          Für Alle, die schnell und einfach maschinen&shy;lesbare
          Veranstaltungs&shy;informationen brauchen.
        </Box>
        <Box title="Kiosk" linkText="zur Kiosk-Ansicht" linkTo="/kiosk">
          Die Kiosk-Ansicht ist für große Displays geeignet und zeigt
          Informationen zu ausgewählten Veranstaltungen.
        </Box>
      </div>
      <div className={styles.actionRow}>
        <div className={styles.actionColumn}>
          <h3 className={styles.contactTitle}>
            Verbesserungsvorschläge oder fehlende Veranstaltungen?
          </h3>
          <p className={styles.contactText}>
            Das wichtigste Ziel von{" "}
            <span className={styles.styledName}>Münster Jetzt</span>: App und
            API so benutzerfreundlich wie möglich gestalten und alle
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
      <div className={styles.footer}>
        <div className={styles.footerItem}>
          <small>&nbsp;</small>
          <a href="https://muensterhack.de">
            <img
              src={mshackLogo}
              alt="MÜNSTERHACK 2019 Logo"
              className={styles.footerItemImg}
            />
          </a>
          <small>
            Gestartet auf dem{" "}
            <a
              className={styles.footerItemLink}
              href="https://muensterhack.de/"
            >
              MÜNSTERHACK 2019
            </a>
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
            <a
              className={styles.footerItemLink}
              href="https://github.com/codeformuenster/muenster-jetzt/"
            >
              GitHub
            </a>
          </small>
        </div>
        <div className={styles.footerItem}>
          <small>Ein Projekt von</small>
          <a href="https://codeformuenster.org/">
            <img
              src={c4mLogo}
              alt="Code for Münster Logo"
              className={styles.footerItemImg}
            />
          </a>
          <small>
            <a
              className={styles.footerItemLink}
              href="https://codeformuenster.org/impressum/#impressum"
            >
              Impressum
            </a>{" "}
            &amp;{" "}
            <a
              className={styles.footerItemLink}
              href="https://codeformuenster.org/impressum/#datenschutz"
            >
              Datenschutz
            </a>
          </small>
        </div>
        <div className={styles.footerItem}>
          <small>&nbsp;</small>
          <span className={styles.atSign}>@</span>
          <small>
            <a href="mailto:muenster-jetzt@codeformuenster.org">
              muenster-jetzt@codeformuenster.org
            </a>
          </small>
        </div>
      </div>
    </div>
  </Layout>
);

export default LandingPage;
