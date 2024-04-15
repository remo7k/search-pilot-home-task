import React from "react";
import ReactDOM from "react-dom/client";
import { onLCP, onFID, onCLS } from "web-vitals";
import App from "./App";
import ApiProductsClient from "./api/products/client/ApiProductsClient";

const apiClient = new ApiProductsClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App apiClient={apiClient} />
  </React.StrictMode>,
);

onCLS(console.log);
onFID(console.log);
onLCP(console.log);
