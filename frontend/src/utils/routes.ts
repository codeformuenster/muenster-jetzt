// Routes should end with a slash (/)!

export const appRootRoute = "/";

const datePathParameter = ":date(\\d{4}-\\d{2}-\\d{2})";

export const appDayRoute = `${appRootRoute}${datePathParameter}/`;

export const makeAppRouteLink: (date?: string) => string = (date) => {
  if (!date) {
    return appRootRoute;
  }

  return appDayRoute.replace(datePathParameter, date);
};

export const kioskRootRoute = "/kiosk/";

export const infoRootRoute = "/info/";

export const apiInfoRoute = `${infoRootRoute}api/`;
