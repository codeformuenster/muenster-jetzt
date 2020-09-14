import React, { FC } from "react";
import { useParams } from "react-router-dom";
import styles from "./App.module.scss";

import Layout from "../UI/Layout/Layout";
import EventsList from "./EventsList/EventsList";

import useGetEvents from "../hooks/useGetEvents";
import DateSelector from "./DateSelector/DateSelector";

interface IAppParams {
  date?: string;
}

const App: FC = () => {
  const { date } = useParams<IAppParams>();
  const { loading, error, events } = useGetEvents(date);

  return (
    <Layout>
      <DateSelector />
      <div className={styles.container}>
        {loading && <p>Daten werden geladen</p>}
        {error}
        {!loading && events && <EventsList events={events} />}
      </div>
    </Layout>
  );
};

export default App;
