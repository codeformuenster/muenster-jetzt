import React, { FC } from "react";
import { useParams } from "react-router-dom";
import styles from "./App.module.scss";

import Layout from "../UI/Layout/Layout";
import EventsList from "./EventsList/EventsList";

import useGetEvents from "../hooks/useGetEvents";
import DateSelector from "./DateSelector/DateSelector";
import LoadingEventListItem from "./EventsListItem/LoadingEventListItem";

interface IAppParams {
  date?: string;
}

const App: FC = () => {
  const { date } = useParams<IAppParams>();
  const { loading, error, events } = useGetEvents(date);

  let dayMonth : string = ''
  if (date) {
    const dateArray : string[] = date?.split('-');
    dayMonth = `${dateArray[2]}.${dateArray[1]}`;
  }

  return (
    <Layout dayMonth={dayMonth} >
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
