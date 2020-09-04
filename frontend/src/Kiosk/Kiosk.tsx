import React, { FC, useMemo } from "react";
import KioskLayout from "../UI/KioskLayout/KioskLayout";
import FullScreenCarousel from "../UI/FullScreenCarousel/FullScreenCarousel";
import useQuery from "../hooks/useQuery";

import { mockData, msDisplay1 } from "./mockdata";

const useMockData = () => {
  const query = useQuery();

  return useMemo(() => {
    switch (query?.device) {
      case "ms-display1":
        return msDisplay1;
      default:
        return mockData;
    }
  }, [query]);
};

const Kiosk: FC = () => {
  const mockedSlideData = useMockData();

  return (
    <KioskLayout>
      <FullScreenCarousel slides={mockedSlideData} />
    </KioskLayout>
  );
};

export default Kiosk;
