import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test.skip("renders without crashing", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/daten werden geladen/i);
  expect(linkElement).toBeInTheDocument();
});
