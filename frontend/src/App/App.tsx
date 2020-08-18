import React, { FC } from "react";
import styles from "./App.module.scss";

import Layout from "../UI/Layout/Layout";
import EventsList from "./EventsList/EventsList";

import useGetEvents from "../hooks/useGetEvents";

const App: FC = () => {
  const { loading, error, events } = useGetEvents();

  return (
    <Layout>
      <div className={styles.container}>
        {error}
        {!loading && events && <EventsList events={events} />}
      </div>
    </Layout>
  );
};

export default App;
