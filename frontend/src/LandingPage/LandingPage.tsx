import React, { FC } from "react";
import { Link } from "react-router-dom";

import Layout from "../UI/Layout/Layout";

import styles from "./LandingPage.module.css";

const LandingPage: FC = () => (
  <Layout>
    <div>Hallo</div>
    <div className={styles.boxes}>
      <div className={styles.box}>App</div>
      <div className={styles.box}>Api</div>
      <div className={styles.box}>
        <Link to="/kiosk">Kiosk</Link>
      </div>
    </div>
  </Layout>
);

export default LandingPage;
