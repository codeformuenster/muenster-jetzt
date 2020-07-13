import React, { FC } from "react";
import KioskLayout from "../UI/KioskLayout/KioskLayout";
import FullScreenCarousel from "../UI/FullScreenCarousel/FullScreenCarousel";

const mockData = [
  {
    title: "Weihnachtsmarkt",
    backgroundImage: "/1920x1080.jpg",
  },
  {
    title: "Münsterland Giro",
    backgroundImage: "https://www.fillmurray.com/1920/1080",
  },
  {
    title: "Münsterhack 2020",
    backgroundImage: "https://placecage.com/1920/1080",
  },
  {
    title: "Grillen im Garten",
    backgroundImage: "https://picsum.photos/1920/1080",
  },
];

const Kiosk: FC = () => {
  return (
    <KioskLayout>
      <FullScreenCarousel slides={mockData} />
    </KioskLayout>
  );
};

export default Kiosk;
