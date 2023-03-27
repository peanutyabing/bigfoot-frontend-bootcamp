import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import SightingContent from "./Components/SightingContent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index={true} element={<App />} />
      <Route path="sightings/:sightingId" element={<SightingContent />} />
    </Routes>
  </BrowserRouter>
);
