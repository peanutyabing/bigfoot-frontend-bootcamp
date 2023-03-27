import { useState, useEffect } from "react";
import SightingSummary from "./Components/SightingSummary.js";
import axios from "axios";
import "./App.css";

export default function App() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    getSightings();
  }, []);

  const getSightings = async () => {
    const sightingsRes = await axios.get("http://localhost:3000/sightings");
    setSightings(sightingsRes.data);
  };

  const renderSightings = () => {
    if (sightings && sightings.length > 0) {
      return sightings.map((sighting, index) => (
        <SightingSummary key={index} sightingIndex={index} data={sighting} />
      ));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bigfoot sightings</h1>
        {renderSightings()}
      </header>
    </div>
  );
}
