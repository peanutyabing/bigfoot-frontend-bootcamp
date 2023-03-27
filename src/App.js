import { useState, useEffect } from "react";
import SightingSummary from "./Components/SightingSummary.js";
import axios from "axios";
import { BACKEND_URL } from "./Constants.js";
import "./App.css";

export default function App() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    getSightings();
  }, []);

  const getSightings = async () => {
    const sightingsRes = await axios.get(`${BACKEND_URL}/sightings`);
    setSightings(sightingsRes.data);
  };

  const renderSightings = () => {
    if (sightings && sightings.length > 0) {
      return sightings.map((sighting, index) => (
        <SightingSummary key={index} sightingIndex={index} data={sighting} />
      ));
    } else {
      return "Loading...";
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bigfoot sightings</h1>
        <div className="flex-container">{renderSightings()}</div>
      </header>
    </div>
  );
}
