import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders without crashing", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/daten werden geladen/i);
  expect(linkElement).toBeInTheDocument();
});
