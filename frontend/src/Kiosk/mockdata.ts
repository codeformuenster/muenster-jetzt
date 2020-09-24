import msjlogo from "../images/ms-jetzt-logo.svg";
import bahnLogo from "../images/logo_db_gobeta.svg";

const toIEvent = function toIEvent(slides: IEventBase[]) {
  return slides.map((slide, index) => ({ id: index, ...slide }));
};

const lambusEvent: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/lambus.jpg",
};

const lambusApp: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/lambus-app.jpg",
  externalUrl: "https://www.lambus.io/",
};

const lambusMap: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/lambus-map.jpg",
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
  externalUrl: "https://www.gemeinsamgehtdas.de/muenster",
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

const arWagenreihung: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/ar-wagenreihung.jpg",
  externalUrl:
    "https://gobeta.de/projekte/zuginformationen-per-app-mit-augmented-reality-ar-testen/",
};

const singleton: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/singleton.jpg",
};

const infabSpaet: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/infab-spaetdran.jpg",
};

// const infabMitmachen: IEventBase = {
//   imageUrl: "https://muenster-jetzt.de/static/uploads/v1/infab-mitmachen.jpg",
// };

const infabMock: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/infab-mock.jpg",
  externalUrl:
    "https://gobeta.de/projekte/radparken-der-zukunft-gemeinsam-mobile-perspektiven-schaffen/",
};

const tretty: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/tretty.jpg",
  externalUrl:
    "https://gobeta.de/projekte/tretty-tretroller-100-oekologisch-mit-muskelkraft-durch-muenster/",
};

const icePortal: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/ice-portal.jpg",
};

const motiontagMuensterBewegt: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/motiontag_bike_mb.png",
};

const motiontagSchritte: IEventBase = {
  imageUrl:
    "https://muenster-jetzt.de/static/uploads/v1/motiontag_schritte_klima.png",
};

// const motiontagPreiseGruen: IEventBase = {
//   imageUrl: "https://muenster-jetzt.de/static/uploads/v1/motiontag_preise_gruen.png",
// };

const motiontagPreiseWeiss: IEventBase = {
  imageUrl:
    "https://muenster-jetzt.de/static/uploads/v1/motiontag_preise_weiss.png",
};

const muensterlandmoment: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/muensterland.jpg",
  externalUrl: "https://www.muensterland.com/deinmuensterlandmoment/",
};

const gornationTeam: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/gornation-team.jpg",
};

const veomo: IEventBase = {
  imageUrl: "https://muenster-jetzt.de/static/uploads/v1/veomo-v2.jpg",
};

const veomoFrame: Omit<ISlide, "id"> = {
  iFrame: { url: "https://db-muenster.veomo.com/" },
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
    "Münster Jetzt ist deine zentrale Anlaufstelle für alle Veranstaltungen in Münster.\nKostenlos und Open-Source!",
  externalUrl: "https://muenster-jetzt.de/",
  cssClassNames: ["vertical", "spaced"],
};

const infabFrame: Omit<ISlide, "id"> = {
  iFrame: { url: "https://bike-frontend.azurewebsites.net" },
};

// const infabVideo: Omit<ISlide, "id"> = {
//   video: {
//     url: "https://muenster-jetzt.de/static/uploads/v1/infab.mov",
//   },
// };

// const motiontagVideo: Omit<ISlide, "id"> = {
//   video: {
//     url: "https://muenster-jetzt.de/static/uploads/v1/motiontag.mp4",
//   },
// };

const bahnhofLiveAppVideo: Omit<ISlide, "id"> = {
  video: {
    url: "https://muenster-jetzt.de/static/uploads/testvideo-notpublic.mp4",
  },
};

const trettyVideo: Omit<ISlide, "id"> = {
  video: {
    url: "https://muenster-jetzt.de/static/uploads/v1/tretty.mp4",
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

export const msPopupAussen: IEvent[] = toIEvent([
  hygiene,
  msj,
  goBetaVideo,
  msHack,
  singleton,
  hygiene,
  nafeEvent,
  goBetaMs,
  lambusEvent,
  lambusMap,
  lambusApp,
  bahnhofLiveAppVideo,
  infabSpaet,
  infabFrame,
  hygiene,
  veomo,
  veomoFrame,
  icePortal,
  arWagenreihung,
  liefergruen,
  muensterlandmoment,
  // muensterlandRadVideo,
  gornationTeam,
  gornationSocialmedia,
  motiontagSchritte,
  motiontagPreiseWeiss,
  motiontagMuensterBewegt,
  vesputi,
  tretty,
]);

export const msPopupKurz: IEvent[] = toIEvent([
  hygiene,
  msj,
  msHack,
  goBetaMs,
  goBetaVideo,
  lambusEvent,
  lambusMap,
  lambusApp,
  arWagenreihung,
  veomo,
  veomoFrame,
  hygiene,
  motiontagPreiseWeiss,
  infabSpaet,
  muensterlandmoment,
  bahnhofLiveAppVideo,
]);

export const msPopupInnen: IEvent[] = msPopupAussen.concat(
  toIEvent([trettyVideo])
);

export const msVitrineAllgemein: IEvent[] = toIEvent([
  hygiene,
  msj,
  goBetaVideo,
  msHack,
  singleton,
  // infabFrame,
  // nafeEvent,
  goBetaMs,
  lambusEvent,
  lambusMap,
  lambusApp,
  motiontagPreiseWeiss,
  motiontagSchritte,
  hygiene,
  veomo,
  veomoFrame,
  bahnhofLiveAppVideo,
  // infabSpaet,
  // hygiene,
  // icePortal,
  // liefergruen,
  // muensterlandRadVideo,
  // gornationTeam,
  // gornationSocialmedia,
  infabMock,
  vesputi,
]);

// db vitrinen pc neu
export const msDisplay9: IEvent[] = msPopupAussen;

export const msDisplay6: IEvent[] = msVitrineAllgemein;
