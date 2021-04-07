import React, { FC } from "react";
import { Link } from "react-router-dom";
import Layout from "../UI/Layout/Layout";
import styles from "./LandingPage.module.scss";
import StyledProjectName from "../UI/StyledProjectName/StyledProjectName";
import Hero from "../UI/Info/Hero";
import Row from "../UI/Info/Row";
import ExternalLink from "../Helpers/ExternalLink";
import Footer from "../UI/Info/Footer";
import { makeAppRouteLink } from "../utils/routes";

const backendBasePath =
  process?.env?.REACT_APP_BACKEND_BASE_PATH || "http://localhost:8000";
const apiDocsUrl = new URL("/", backendBasePath).toString();

const ApiInfoPage: FC = () => (
  <Layout>
    <Hero subtitle="API Dokumentation">
      Die offene Programmier&shy;schnittstelle (API) von <StyledProjectName />
      erlaubt das kostenlose Abrufen von offenen Veranstaltungs&shy;daten für
      Münster.
      <div className={styles.goToApiDocsBox}>
        Unter{" "}
        <ExternalLink className={styles.link} href={apiDocsUrl}>
          {apiDocsUrl}
        </ExternalLink>{" "}
        befinden sich API-Spezifikation, Beschreibung aller Felder und eine
        Möglichkeit die API direkt im Browser auszuprobieren.
        <br />
        <ExternalLink
          className={styles.goToApiDocsLinkButton}
          href={apiDocsUrl}
        >
          API Dokumentation öffnen
        </ExternalLink>
      </div>
    </Hero>
    <Row
      singleColumnClassName={styles.singleColumn}
      rowTitle="Eine API für Veranstaltungsdaten"
    >
      <p className={styles.prosaText}>
        Für eine lebendige und nachhaltige Veranstaltungskultur benötigt es
        neben Veranstaltern, Orten, Künstlern, Vortragenden, Darstellern, usw.
        auch Besucher und Gäste.
      </p>
      <p className={styles.prosaText}>
        Damit interessierte Menschen von Veranstaltungen erfahren können, müssen
        Veranstaltungsinformationen geneigten Besuchern verfügbar gemacht. Dies
        wurde in Vergangenheit sowohl mündlich, in Print, E-Mail als auch
        Webseiten getan. werden. Dieser Aufzählung fehlt unserer Meinung nach
        allerdings eine offene und maschinenlesbare Alternative. Eines der Ziele
        von <StyledProjectName noBackground />
      </p>
      <p className={styles.prosaText}>
        Während die{" "}
        <Link to={makeAppRouteLink()}>
          <StyledProjectName noBackground />
          -App
        </Link>{" "}
        als Schnittstelle zwischen Veranstaltungen und Veranstaltungssuchenden
        fungiert, so soll die API von <StyledProjectName noBackground /> eine
        offene Schnittstelle für Entwickler, die mit Veranstaltungsdaten
        arbeiten wollen, anbieten.
      </p>
    </Row>
    <Row
      singleColumnClassName={styles.singleColumn}
      rowTitle="Weitere Informationen"
    >
      <p className={styles.prosaText}>
        Informationen zur Nutzung und Beschreibungen aller Felder befinden sich
        in der <ExternalLink href={apiDocsUrl}>API Dokumentation</ExternalLink>.
        Mit der{" "}
        <ExternalLink href={`${apiDocsUrl}openapi.json`}>
          OpenAPI v3 Spezifikation
        </ExternalLink>{" "}
        der <StyledProjectName noBackground />
        -API lassen sich schnell und einfach eigene Clients in vielen
        Programmiersprachen generieren.
      </p>
      <p className={styles.prosaText}>
        Hinweise, Verbesserungsvorschläge oder Fehlerbeschreibungen rund um API
        und App sollten am Besten als &bdquo;Issue&ldquo; im{" "}
        <ExternalLink href="https://github.com/codeformuenster/muenster-jetzt">
          codeformuenster/muenster-jetzt
        </ExternalLink>{" "}
        Repository auf GitHub angelegt werden.
        <br />
        Alternativ sind wir auch auf{" "}
        <ExternalLink href="https://twitter.com/codeformuenster">
          Twitter
        </ExternalLink>{" "}
        oder{" "}
        <a href="mailto:muenster-jetzt@codeformuenster.org?subject=API">
          per Mail
        </a>{" "}
        zu erreichen.
      </p>
      <p className={styles.prosaText}>
        Sowohl API als auch die App lassen sich auch auf eigenen Servern hosten.{" "}
        Hinweise dazu finden sich ebenfalls im Repository{" "}
        <ExternalLink href="https://github.com/codeformuenster/muenster-jetzt">
          codeformuenster/muenster-jetzt
        </ExternalLink>{" "}
        auf GitHub.
      </p>
    </Row>
    <Footer />
  </Layout>
);

export default ApiInfoPage;
