import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import SightingContent from "./Components/SightingContent";
import SightingSummary from "./Components/SightingSummary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index={true} element={<SightingSummary />} />
        <Route path="sightings/:sightingId" element={<SightingContent />} />
        <Route path="*" element={"Path does not exist"} />
      </Route>
    </Routes>
  </BrowserRouter>
);
