import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "./LandingPage";

const renderPage = () =>
  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );

describe("LandingPage", () => {
  it("links to the app and the API documentation", () => {
    renderPage();

    expect(screen.getByRole("link", { name: "Zur App" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: "Dokumentation" })).toHaveAttribute(
      "href",
      "/info/api/"
    );
  });

  it("lists the data sources", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: "Datenquellen" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "münsterland.digital" })
    ).toHaveAttribute("href", "https://www.muensterland.digital/api");
  });
});
