import React, { FC, useMemo } from "react";
import KioskLayout from "../UI/KioskLayout/KioskLayout";
import FullScreenCarousel from "../UI/FullScreenCarousel/FullScreenCarousel";
import useDevice from "../hooks/useDevice";

import { mockData, msDisplay1 } from "./mockdata";

const useMockData = () => {
  const device = useDevice();

  return useMemo(() => {
    switch (device) {
      case "ms-display1":
        return msDisplay1;
      default:
        return mockData;
    }
  }, [device]);
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
