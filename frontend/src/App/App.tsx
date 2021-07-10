import React, { FC } from "react";
import { useParams } from "react-router-dom";
import styles from "./App.module.scss";

import Layout from "../UI/Layout/Layout";
import EventsList from "./EventsList/EventsList";

import useGetEvents from "../hooks/useGetEvents";
import DateSelector from "./DateSelector/DateSelector";
import useDateWithoutYear from "../hooks/useDateWithoutYear";

const App: FC = () => {
  const { date } = useParams<IAppRouterParams>();
  const { loading, error, events } = useGetEvents(date);

  const dateWithoutYear = useDateWithoutYear(date);

  return (
    <Layout
      header={
        <h4 className={styles.title}>Veranstaltungen am {dateWithoutYear}</h4>
      }
    >
      <div className={styles.maxWidthContainer}>
        <DateSelector />
        <div className={styles.container}>
          <EventsList events={events} loading={loading} error={error} />
        </div>
      </div>
    </Layout>
  );
};

export default App;
