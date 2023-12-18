import React, { FC } from "react";
import { Link } from "react-router-dom";

import Layout from "../UI/Layout/Layout";
import Box from "./Box";
import ExternalLink from "../Helpers/ExternalLink";
import styles from "./LandingPage.module.scss";
import {
  makeAppRouteLink,
  apiInfoRoute,
  kioskRootRoute,
} from "../utils/routes";
import StyledProjectName from "../UI/StyledProjectName/StyledProjectName";
import Hero from "../UI/Info/Hero";
import Row from "../UI/Info/Row";
import Footer from "../UI/Info/Footer";

const dataSources = [
  ["Münster Update", ""],
  ["münsterland.digital", "https://www.muensterland.digital/api"],
  ["DB goBeta", "https://gobeta.de/alle-veranstaltungen/"],
  [
    "Datenportal Münsterland (Münsterland e.V.)",
    "https://www.datenportal-muensterland.de/",
  ],
];

const LandingPage: FC = () => (
  <Layout>
    <Hero subtitle="Alle Veranstaltungen im Überblick">
      <StyledProjectName /> ist deine zentrale Anlaufstelle für alle
      Veranstaltungen in Münster.
      <br />
      Mit unserer App bist du immer bestens informiert. Die API bietet Zugriff
      auf maschinen&shy;lesbare Veranstaltungs&shy;informationen als Offene
      Daten.
    </Hero>
    <Row>
      <Box title="App" linkText="Zur App" linkTo={makeAppRouteLink()} preview>
        Mit der App verpasst du keine Veranstaltung mehr. Egal ob auf deinem
        Handy, Tablet oder Laptop, die <StyledProjectName noBackground /> App
        ist einfach immer dabei.
      </Box>
      <Box title="API" linkText="Dokumentation" linkTo={apiInfoRoute} preview>
        Für Alle, die schnell und einfach maschinen&shy;lesbare
        Veranstaltungs&shy;informationen brauchen.
      </Box>
      <Box title="Kiosk" linkText="zur Kiosk-Ansicht" linkTo="/kiosk" preview>
        Die Kiosk-Ansicht ist für große Displays geeignet und zeigt
        Informationen zu ausgewählten Veranstaltungen.
      </Box>
    </Row>
    <Row rowTitle="Datenquellen" singleColumnClassName={styles.singleColumn}>
      <ul className={styles.dataSources}>
        {dataSources.map(([name, url]) => (
          <li key={name + url}>
            <span role="img" aria-label="Häkchen">
              ✅
            </span>
            {url ? <ExternalLink href={url}>{name}</ExternalLink> : name}
          </li>
        ))}
      </ul>
    </Row>
    <Row
      rowTitle="Verbesserungsvorschläge oder fehlende Veranstaltungen?"
      singleColumnClassName={styles.singleColumn}
    >
      <p className={styles.contactText}>
        Das wichtigste Ziel von <StyledProjectName noBackground />: App und API
        so benutzerfreundlich wie möglich gestalten und alle
        Veranstaltungskalender vereinen.
      </p>
      <a
        href="mailto:muenster-jetzt@codeformuenster.org?subject=Hallo"
        className={styles.contactLink}
      >
        Kontakt aufnehmen
      </a>
    </Row>
    <Row rowTitle="Projektplan">
      <div className={styles.projectPlanColumn}>
        <h5 className={styles.projectPlanTitle}>App &amp; API</h5>
        <p className={styles.projectPlanText}>
          Bereits auf dem{" "}
          <ExternalLink href="https://muensterhack.de/">
            MÜNSTERHACK 2019
          </ExternalLink>{" "}
          wurden die ersten Grundsteine für <StyledProjectName noBackground />{" "}
          gelegt. Das Ziel zum MÜNSTERHACK (2020), eine einfache und offene API
          für Veranstaltungsinformationen in Münster zu liefern, wurde
          eingehalten.
          <br />
          In Zukunft wollen wir weitere Datenquellen anbinden sowie die App und{" "}
          <Link to={apiInfoRoute}>API-Dokumentation</Link> ausbauen.
        </p>
      </div>
      <div className={styles.projectPlanColumn}>
        <h5 className={styles.projectPlanTitle}>Kiosk</h5>
        <p className={styles.projectPlanText}>
          Im Rahmen des Projekts{" "}
          <ExternalLink href="https://gobeta.de/projekte/bahnhof-muenster/">
            Zukunftsbahnhof Münster
          </ExternalLink>{" "}
          entwickeln wir speziell für große Displays eine{" "}
          <Link to={kioskRootRoute}>Kiosk-Ansicht</Link>.
          <br />
          Weitere Informationen auf{" "}
          <ExternalLink href="https://gobeta.de/projekte/muenster-jetzt/">
            gobeta.de
          </ExternalLink>
          .
        </p>
      </div>
    </Row>
    <Footer />
  </Layout>
);

export default LandingPage;
