import React, { FC } from "react";
import KioskLayout from "../UI/KioskLayout/KioskLayout";
import FullScreenCarousel from "../UI/FullScreenCarousel/FullScreenCarousel";

const mockData: IEvent[] = [
  {
    title: "Weihnachtsmarkt",
    subtitle: "Festlich shoppen in der Innenstadt",
    imageUrl: "https://placekitten.com/1080/1080",
  },
  {
    title: "Münsterland Giro",
    subtitle: "Alle Räder wollen laufen",
    imageUrl: "https://www.fillmurray.com/1920/1080",
  },
  {
    title: "Münsterhack 2020",
    subtitle: "IT-Profis aus der Region tippen sich die Finger wund",
    imageUrl: "https://placebear.com/1920/1080",
  },
  {
    title: "Grillen im Garten",
    subtitle: "Ruhe und Entspannung daheim",
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
