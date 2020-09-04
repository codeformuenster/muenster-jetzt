import msjlogo from "../images/ms-jetzt-logo.svg";

const lambusEvent: IEventBase = {
  imageUrl: "https://www.bleker-it.de/download/db_lambus_1.png",
};

const msHack: IEventBase = {
  title: "MÜNSTERHACK 2020",
  subtitle: "Hackathon Für Münster",
  description:
    "Beim MÜNSTERHACK kommt die Tech-Szene in Münster zusammen und entwickelt gemeinsam Ideen und Prototypen, um die eigene Stadt noch lebenswerter zu machen.\n\n25./26. SEPTEMBER 2020",
  imageUrl: "https://www.muensterhack.de/img/logo_muensterhack.png",
  externalUrl: "https://gobeta.de/veranstaltungen/muensterhack-2020/",
  style: {
    backgroundColor: "#FCDD09",
  },
};

const hygiene: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/hygienemassnahmen.jpg",
  externalUrl: "https://www.gemeinsamgehtdas.de/",
};

const nafeEvent: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/nafe-qr.jpg",
};

const demoIntro: IEventBase = {
  imageUrl: msjlogo,
  title: "Demo Seite",
  description:
    "Diese Seite demonstriert wie unsere Events auf deiner Digital Signage Lösung aussehen könnten.\nAchtung: Diese Demo ist auf eine Desktop Darstellung mit 1920x1080 (Full HD) optimiert",
  cssClassName: "vertical",
};

const einkaufsBahnhof: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/db_icons.png",
  externalUrl:
    "https://gobeta.de/projekte/neue-angebote-am-hauptbahnhof-muenster-ausprobieren-im-sommer-2020/",
};

const msj: IEventBase = {
  imageUrl: msjlogo,
  title: "Alle Veranstaltungen im Überblick",
  description:
    "Münster Jetzt ist deine zentrale Anlaufstelle für alle Veranstaltungen in Münster.\nKostenlos, Werbefrei und Open-Source!",
  externalUrl: "https://muenster-jetzt.de/",
  cssClassName: "vertical",
};

const mindbox: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/Mindbox_Vitrine.png",
};

export const mockData: IEvent[] = [
  { id: 0, ...demoIntro },
  { id: 2, ...msHack },
  { id: 1, ...msj },
];
export const msDisplay1: IEvent[] = [
  { id: 0, ...hygiene },
  { id: 1, ...einkaufsBahnhof },
  { id: 2, ...msHack },
  { id: 3, ...nafeEvent },
  { id: 4, ...lambusEvent },
  { id: 5, ...mindbox },
];
