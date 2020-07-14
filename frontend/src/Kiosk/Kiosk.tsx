import React, { FC } from "react";
import KioskLayout from "../UI/KioskLayout/KioskLayout";
import FullScreenCarousel from "../UI/FullScreenCarousel/FullScreenCarousel";

const mockData = [
  {
    title: "Weihnachtsmarkt",
    imageUrl: "/1920x1080.jpg",
  },
  {
    title: "Münsterland Giro",
    imageUrl: "https://www.fillmurray.com/1920/1080",
  },
  {
    title: "Münsterhack 2020",
    imageUrl: "https://placecage.com/1920/1080",
  },
  {
    title: "Grillen im Garten",
    imageUrl: "https://picsum.photos/1920/1080",
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
