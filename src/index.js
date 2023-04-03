import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import SightingContent from "./Components/SightingContent.js";
import Filter from "./Components/Filter.js";
import NavBar from "./Components/NavBar.js";
import ReportForm from "./Components/ReportForm.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="filter" element={<Filter />} />
        <Route path="report-sighting" element={<ReportForm />} />
      </Route>
      <Route path="sightings/:id" element={<SightingContent />} />
      <Route path="*" element={"Path does not exist"} />
    </Routes>
  </BrowserRouter>
);
