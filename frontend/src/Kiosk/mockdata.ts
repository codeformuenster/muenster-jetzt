import msjlogo from "../images/ms-jetzt-logo.svg";
import bahnLogo from "../images/logo_db_gobeta.svg";

const lambusEvent: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/lambus.jpg",
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
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/nafe.jpg",
  externalUrl:
    "https://gobeta.de/news/probiere-die-neue-mikromobilitaetsapp-nafe-aus/",
};

const vesputi: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/vesputi.jpg",
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
  subtitle: "19. - 26. September 2020",
  description:
    "#MünsterHbf ruft zum großen Sommertest: Im Rahmen des Projekts „Zukunftsbahnhof“ zeigen spannende Startups und lokale Partner ihre aktuellen Projekte rund um neue, komfortablere Mobilität. Und testen sie vor Ort, lokal, und mit echten Reisenden: Mit Euch!",
  style: {
    backgroundImage:
      "url(https://muenster-jetzt.de/static/uploads/go-beta-background.jpg)",
    backgroundSize: "cover",
    color: "white",
  },
  cssClassNames: ["vertical", "img-20-vh"],
};

const singleton: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/singleton.jpg",
};

const infabSpaet: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/infab-spaetdran.jpg",
};

const infabMock: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/infab-mock.jpg",
  externalUrl:
    "https://gobeta.de/projekte/radparken-der-zukunft-gemeinsam-mobile-perspektiven-schaffen/",
};

const icePortal: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/ice-portal.jpg",
};

const gornationTeam: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/gornation-team.jpg",
};

const gornationSocialmedia: IEventBase = {
  imageUrl:
    "https://muenster-jetzt.de/static/uploads/v1/gornation-socialmedia.jpg",
  externalUrl: "https://gobeta.de/projekte/pop-up-store-lokal-digital/",
};

const liefergruen: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/liefergruen.jpg",
  externalUrl: "https://liefergruen.com",
};

const msj: Omit<ISlide, "id"> = {
  imageUrl: msjlogo,
  title: "Alle Veranstaltungen im Überblick",
  description:
    "Münster Jetzt ist deine zentrale Anlaufstelle für alle Veranstaltungen in Münster.\nKostenlos, Werbefrei und Open-Source!",
  externalUrl: "https://muenster-jetzt.de/",
  cssClassNames: "vertical",
};

const infabFrame: Omit<ISlide, "id"> = {
  iFrame: { url: "https://bike-frontend.azurewebsites.net" },
};

const bahnhofLiveAppVideo: Omit<ISlide, "id"> = {
  video: {
    url: "https://muenster-jetzt.de/static/uploads/testvideo-notpublic.mp4",
  },
};

const goBetaVideo: Omit<ISlide, "id"> = {
  video: {
    url: "https://muenster-jetzt.de/static/uploads/raysono-v3.mp4",
  },
};

// const muensterlandRadVideo: Omit<ISlide, "id"> = {
//   video: {
//     url: "https://muenster-jetzt.de/static/uploads/v1/muensterland-radtour.mp4",
//   },
// };

export const mockData: IEvent[] = [
  { id: 0, ...demoIntro },
  { id: 1, ...goBetaMs },
  { id: 2, ...msHack },
  { id: 3, ...msj },
];
export const msDisplay1: IEvent[] = [
  // { id: 0, ...hygiene },
  // { id: 1, ...goBetaIcons },
  // { id: 2, ...msHack },
  // { id: 3, ...vesputi },
  // { id: 4, ...bikeParking },
  { id: 5, ...goBetaMs },
  // { id: 6, ...lambusEvent },
  // { id: 7, ...bahnhofLiveAppVideo },
];

export const msPopupAussen: IEvent[] = [
  { id: 0, ...hygiene },
  { id: 1, ...goBetaVideo },
  { id: 2, ...msHack },
  { id: 3, ...singleton },
  { id: 4, ...hygiene },
  { id: 5, ...infabFrame },
  { id: 6, ...nafeEvent },
  { id: 7, ...goBetaMs },
  { id: 8, ...lambusEvent },
  { id: 9, ...bahnhofLiveAppVideo },
  { id: 10, ...infabSpaet },
  { id: 11, ...hygiene },
  { id: 12, ...icePortal },
  { id: 13, ...liefergruen },
  // { id: 14, ...muensterlandRadVideo },
  { id: 15, ...gornationTeam },
  { id: 16, ...gornationSocialmedia },
  { id: 17, ...infabMock },
  { id: 18, ...vesputi },
];

export const msPopupInnen: IEvent[] = msPopupAussen;

export const msVitrineAllgemein: IEvent[] = [
  { id: 0, ...hygiene },
  { id: 1, ...goBetaVideo },
  { id: 2, ...msHack },
  { id: 3, ...singleton },
  // { id: 5, ...infabFrame },
  // { id: 6, ...nafeEvent },
  { id: 4, ...goBetaMs },
  { id: 5, ...lambusEvent },
  { id: 6, ...hygiene },
  { id: 7, ...bahnhofLiveAppVideo },
  // { id: 10, ...infabSpaet },
  // { id: 11, ...hygiene },
  // { id: 12, ...icePortal },
  // { id: 13, ...liefergruen },
  // { id: 14, ...muensterlandRadVideo },
  // { id: 15, ...gornationTeam },
  // { id: 16, ...gornationSocialmedia },
  { id: 8, ...infabMock },
  { id: 9, ...vesputi },
];

// db vitrinen pc neu
export const msDisplay9: IEvent[] = [
  { id: 0, ...hygiene },
  { id: 1, ...goBetaVideo },
  { id: 2, ...msHack },
  { id: 3, ...singleton },
  { id: 4, ...hygiene },
  { id: 5, ...infabFrame },
  { id: 6, ...nafeEvent },
  { id: 7, ...goBetaMs },
  { id: 8, ...lambusEvent },
  { id: 9, ...bahnhofLiveAppVideo },
  { id: 10, ...infabSpaet },
  { id: 11, ...hygiene },
  { id: 12, ...icePortal },
  { id: 13, ...liefergruen },
  // { id: 14, ...muensterlandRadVideo },
  { id: 15, ...gornationTeam },
  { id: 16, ...gornationSocialmedia },
  { id: 17, ...infabMock },
  { id: 18, ...vesputi },
];

export const msDisplay6: IEvent[] = msVitrineAllgemein;
