import React, { FC, useMemo } from "react";
import KioskLayout from "../UI/KioskLayout/KioskLayout";
import FullScreenCarousel from "../UI/FullScreenCarousel/FullScreenCarousel";
import useDevice from "../hooks/useDevice";

import {
  mockData,
  msDisplay1,
  msDisplay9,
  msDisplay6,
  msPopupAussen,
  msPopupKurz,
  msVitrineAllgemein,
  msPopupInnen,
} from "./mockdata";

const useMockData = () => {
  const device = useDevice();

  return useMemo(() => {
    switch (device) {
      case "ms-display1":
        return msDisplay1;
      case "ms-display9":
        return msDisplay9;
      case "ms-popup-aussen":
        return msPopupAussen;
      case "ms-popup-innen":
        return msPopupInnen;
      case "ms-popup-kurz-249":
        return msPopupKurz;
      case "ms-vitrine-allgemein":
        return msVitrineAllgemein;
      case "ms-display6":
        return msDisplay6;
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
