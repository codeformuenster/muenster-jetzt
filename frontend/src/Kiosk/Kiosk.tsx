import React, { FC } from "react";
import KioskLayout from "../UI/KioskLayout/KioskLayout";
import FullScreenCarousel from "../UI/FullScreenCarousel/FullScreenCarousel";

const mockData: ISlide[] = [
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
    imageUrl: "https://www.bleker-it.de/download/nafe-qr.jpg",
  },
  {
    id: 4,
    iFrame: { url: "https://bike-frontend.azurewebsites.net" },
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
