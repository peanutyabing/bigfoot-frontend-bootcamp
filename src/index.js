import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import SightingContent from "./Components/SightingContent.js";
import SightingSummary from "./Components/SightingSummary.js";
import Filter from "./Components/Filter.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<SightingSummary />} />
        <Route path="filter" element={<Filter />} />
        <Route path="sightings/:sightingId" element={<SightingContent />} />
        <Route path="*" element={"Path does not exist"} />
      </Route>
    </Routes>
  </BrowserRouter>
);
