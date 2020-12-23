// Routes should end with a slash (/)!
const pathToRegexp = require("path-to-regexp");

export const appRootRoute = "/";

const datePathParameter = ":date(\\d{4}-\\d{2}-\\d{2})";

export const appDayRoute = `${appRootRoute}${datePathParameter}/`;

const dateToPath = pathToRegexp.compile(appDayRoute);
export const makeAppRouteLink: (date?: string) => string = (date) => {
  if (!date) {
    return appRootRoute;
  }

  return dateToPath({ date });
};

export const kioskRootRoute = "/kiosk/";

export const infoRootRoute = "/info/";

export const apiInfoRoute = `${infoRootRoute}api/`;
