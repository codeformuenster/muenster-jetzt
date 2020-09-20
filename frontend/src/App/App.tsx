import React, { FC } from "react";
import { useParams } from "react-router-dom";
import styles from "./App.module.scss";

import Layout from "../UI/Layout/Layout";
import EventsList from "./EventsList/EventsList";

import useGetEvents from "../hooks/useGetEvents";
import DateSelector from "./DateSelector/DateSelector";
import LoadingEventListItem from "./EventsListItem/LoadingEventListItem";
import useDateWithoutYear from "../hooks/useDateWithoutYear";

interface IAppParams {
  date?: string;
}

const App: FC = () => {
  const { date } = useParams<IAppParams>();
  const { loading, error, events } = useGetEvents(date);

  const dateWithoutYear = useDateWithoutYear(date);

  return (
    <Layout
      header={
        <div>
          <h4 className={styles.title}>Veranstaltungen am {dateWithoutYear}</h4>
        </div>
      }
    >
      <DateSelector />
      <div className={styles.container}>
        {loading && <LoadingEventListItem />}
        {error && <p>{error.message}</p>}
        {!loading && events && <EventsList events={events} />}
      </div>
    </Layout>
  );
};

export default App;
