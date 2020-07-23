import React, { FC } from "react";
import { Link } from "react-router-dom";

import Layout from "../UI/Layout/Layout";

import styles from "./LandingPage.module.scss";

import Box from "./Box";

const LandingPage: FC = () => (
  <Layout>
    <div className={styles.welcomeText}>
      Alle Veranstaltungen in Münster im Überblick
    </div>
    <div className={styles.welcomeText2}>
      Münster Jetzt ist deine zentrale Anlaufstelle für alle Veranstaltungen in
      Münster.
      <br />
      Mit unserer App bist du immer bestens informiert. Die API bietet Zugriff
      auf maschinenlesbare Veranstaltungsinformationen als Open Data.
    </div>
    <div className={styles.boxes}>
      <Box title="App" />
      <Box title="API" />
      <Box title="Kiosk">
        <Link to="/kiosk">Kiosk</Link>
      </Box>
    </div>
  </Layout>
);

export default LandingPage;
