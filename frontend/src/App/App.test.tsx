import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import { vi } from "vitest";
import App from "./App";
import { appDayRoute } from "../utils/routes";

vi.mock("../hooks/useGetEvents", () => ({
  default: () => ({ loading: false, error: null, events: [] }),
}));

const renderApp = (date: string) =>
  render(
    <MemoryRouter initialEntries={[`/${date}/`]}>
      <Switch>
        <Route path={appDayRoute}>
          <App />
        </Route>
      </Switch>
    </MemoryRouter>
  );

describe("App", () => {
  it("shows the selected day without the year", () => {
    renderApp("2024-02-29");

    expect(screen.getByText("Veranstaltungen am 29.02.")).toBeInTheDocument();
  });
});
