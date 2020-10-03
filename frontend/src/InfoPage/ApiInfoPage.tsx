import React, { FC } from "react";
import Layout from "../UI/Layout/Layout";
import styles from "./LandingPage.module.scss";

const ApiInfoPage: FC = () => (
  <Layout hideHeader>
    <div className={styles.welcomeText}>Alle Veranstaltungen im Überblick</div>
    <div className={styles.welcomeText2}>Wat</div>
  </Layout>
);

export default ApiInfoPage;
