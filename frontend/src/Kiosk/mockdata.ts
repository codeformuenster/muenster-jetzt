import msjlogo from "../images/ms-jetzt-logo.svg";
import bahnLogo from "../images/logo_db_gobeta.svg";

const lambusEvent: IEventBase = {
  imageUrl: "https://www.bleker-it.de/download/db_lambus_1.png",
};

const msHack: Omit<ISlide, "id"> = {
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

const demoIntro: Omit<ISlide, "id"> = {
  imageUrl: msjlogo,
  title: "Demo Seite",
  description:
    "Diese Seite demonstriert wie unsere Events auf deiner Digital Signage Lösung aussehen könnten.\nAchtung: Diese Demo ist auf eine Desktop Darstellung mit 1920x1080 (Full HD) optimiert",
  cssClassNames: "vertical",
};

const goBetaMs: Omit<ISlide, "id"> = {
  externalUrl: "https://gobeta.de/ms",
  title: "Innovationen entdecken am Hauptbahnhof Münster",
  imageUrl: bahnLogo,
  subtitle: "19. - 27. September 2020",
  description:
    "#MünsterHbf ruft zum großen Sommertest: Im Rahmen des Projekts „Zukunftsbahnhof“ zeigen spannende Startups und lokale Partner ihre aktuellen Projekte rund um neue, komfortablere Mobilität. Und testen sie vor Ort, lokal, und mit echten Reisenden: Mit Euch!",
  style: {
    backgroundImage:
      "url(https://gobeta.de/wp-content/uploads/2020/07/IMG_1610_begradigt_35_unschaerfe-3000x1934.png)",
    backgroundSize: "cover",
    color: "white",
  },
  cssClassNames: ["vertical", "img-20-vh"],
};

const goBetaIcons: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/db_icons.png",
  externalUrl:
    "https://gobeta.de/projekte/neue-angebote-am-hauptbahnhof-muenster-ausprobieren-im-sommer-2020/",
};

const msj: Omit<ISlide, "id"> = {
  imageUrl: msjlogo,
  title: "Alle Veranstaltungen im Überblick",
  description:
    "Münster Jetzt ist deine zentrale Anlaufstelle für alle Veranstaltungen in Münster.\nKostenlos, Werbefrei und Open-Source!",
  externalUrl: "https://muenster-jetzt.de/",
  cssClassNames: "vertical",
};

const bikeParking: Omit<ISlide, "id"> = {
  iFrame: { url: "https://bike-frontend.azurewebsites.net" },
};

export const mockData: IEvent[] = [
  { id: 0, ...demoIntro },
  { id: 1, ...goBetaMs },
  { id: 2, ...msHack },
  { id: 3, ...msj },
];
export const msDisplay1: IEvent[] = [
  { id: 0, ...hygiene },
  { id: 1, ...goBetaIcons },
  { id: 2, ...msHack },
  { id: 3, ...nafeEvent },
  { id: 4, ...lambusEvent },
  { id: 5, ...bikeParking },
];
