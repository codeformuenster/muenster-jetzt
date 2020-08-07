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
  imageUrl: "https://www.bleker-it.de/download/hygienemassnahmen.jpg",
  externalUrl: "https://www.gemeinsamgehtdas.de/",
};

const nafeEvent: IEventBase = {
  imageUrl: "https://www.bleker-it.de/download/nafe-qr.jpg",
};

const einkaufsBahnhof: IEventBase = {
  imageUrl: "https://www.bleker-it.de/download/db_icons.png",
  externalUrl:
    "https://gobeta.de/projekte/neue-angebote-am-hauptbahnhof-muenster-ausprobieren-im-sommer-2020/",
};

const mindbox: IEventBase = {
  imageUrl: "https://www.bleker-it.de/download/Mindbox_Vitrine.png",
};

export const mockData: IEvent[] = [
  { id: 0, ...hygiene },
  { id: 1, ...lambusEvent },
  { id: 2, ...msHack },
  { id: 3, ...nafeEvent },
  { id: 4, ...mindbox }
];
export const mockData2: IEvent[] = [
  { id: 0, ...hygiene },
  { id: 1, ...einkaufsBahnhof },
  { id: 2, ...msHack },
  { id: 3, ...nafeEvent },
];
