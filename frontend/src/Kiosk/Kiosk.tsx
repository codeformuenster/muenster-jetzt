import React, { FC } from "react";
import KioskLayout from "../UI/KioskLayout/KioskLayout";
import FullScreenCarousel from "../UI/FullScreenCarousel/FullScreenCarousel";

const mockData: IEvent[] = [
  {
    id: 0,
    imageUrl: "https://www.bleker-it.de/download/hygienemassnahmen.jpg",
    externalUrl: "https://www.gemeinsamgehtdas.de/",
  },
  {
    id: 1,
    imageUrl: "https://www.bleker-it.de/download/db_lambus_1.png",
  },
  {
    id: 2,
    title: "MÜNSTERHACK 2020",
    subtitle: "Hackathon Für Münster",
    description:
      "Beim MÜNSTERHACK kommt die Tech-Szene in Münster zusammen und entwickelt gemeinsam Ideen und Prototypen, um die eigene Stadt noch lebenswerter zu machen.\n\n25./26. SEPTEMBER 2020",
    imageUrl: "https://www.muensterhack.de/img/logo_muensterhack.png",
    externalUrl: "https://gobeta.de/veranstaltungen/muensterhack-2020/",
    style: {
      backgroundColor: "#FCDD09",
    },
  },
  {
    id: 3,
    imageUrl: "https://www.bleker-it.de/download/hygienemassnahmen.jpg",
    externalUrl: "https://www.gemeinsamgehtdas.de/",
  },
  {
    id: 4,
    imageUrl: "https://www.bleker-it.de/download/nafe-qr.jpg",
  },
  {
    id: 5,
    imageUrl: "https://www.bleker-it.de/download/db_icons.png",
    externalUrl:
      "https://gobeta.de/projekte/neue-angebote-am-hauptbahnhof-muenster-ausprobieren-im-sommer-2020/",
  },
  {
    id: 6,
    imageUrl: "https://www.bleker-it.de/download/hygienemassnahmen.jpg",
    externalUrl: "https://www.gemeinsamgehtdas.de/",
  },
  {
    id: 7,
    imageUrl: "https://www.bleker-it.de/download/Mindbox_Vitrine.png",
  },
  {
    id: 8,
    title: "MÜNSTERHACK 2020",
    subtitle: "Deine Hacking-Idee für ein (noch) lebenswerteres Münster!",
    description:
      "Der MÜNSTERHACK 2020 steht vor der Tür: Reiche noch bis zum 31. August Deine Ideen für Münster ein, indem du den QR-Code scannst ➡️",
    imageUrl: "https://www.muensterhack.de/img/logo_muensterhack.png",
    externalUrl:
      "https://gobeta.de/news/deine-hacking-idee-fuer-ein-noch-lebenswerteres-muenster/",
    style: {
      backgroundColor: "#FCDD09",
    },
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
