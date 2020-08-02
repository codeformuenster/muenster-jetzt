import React, { FC } from "react";
import styles from "./App.module.scss";

import Layout from "../UI/Layout/Layout";
import EventsList from "./EventsList/EventsList";

import { useEventsEventsGet } from "../generated-api-client";

const App: FC = () => {
  const { loading, error } = useEventsEventsGet({});

  return (
    <Layout>
      <div className={styles.container}>
        {JSON.stringify({ loading, error })}
        <EventsList />
      </div>
    </Layout>
  );
};

export default App;
