import React, { FC } from "react";
import KioskLayout from "../UI/KioskLayout/KioskLayout";
import FullScreenCarousel from "../UI/FullScreenCarousel/FullScreenCarousel";

const mockData: IEvent[] = [
  {
    title: "Wochenmarkt",
    subtitle: "Mittwochsmarkt auf dem Domplatz in Münster",
    start: new Date(2020, 6, 15, 7),
    end: new Date(2020, 6, 15, 14, 30),
    description:
      "Mit rund 150 Ständen ist der Wochenmarkt auf dem Domplatz der größte in Münster. Ein üppiges Angebot zieht mittwochs und besonders samstags die Besucherströme in die Innenstadt: Obst und Gemüse, Fisch und Meeresfrüchte, Gewürze, Öl und Antipasti, unzählige Käsesorten, Honig, Brot und Kuchen, Fleisch und Wurst, Wild und Geflügel und - vor allem im Spätsommer - ein wahres Blumenmeer.",
    imageUrl:
      "https://www.wochenmarkt-muenster.de/fileadmin/_processed_/8/f/csm_anfahrt-01_01_849037d810.jpg",
    externalUrl: "https://www.wochenmarkt-muenster.de/",
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
