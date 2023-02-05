import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Chart.js is tree-shakeable, so it is necessary to import and register the controllers, elements, scales and plugins you are going to use.
// https://www.chartjs.org/docs/master/getting-started/integration.html#quick-start
import "chart.js/auto";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
