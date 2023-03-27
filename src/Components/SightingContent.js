import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { BACKEND_URL } from "../Constants.js";

export default function SightingContent() {
  const [sighting, setSighting] = useState({});
  let currentRoute = useLocation();

  useEffect(() => {
    getSighting();
  }, []);

  const getSighting = async () => {
    let sightingIndex = currentRoute.pathname.split("/").slice(-1);
    let sightingResponse = await axios.get(
      `${BACKEND_URL}/sightings/${sightingIndex}`
    );
    setSighting(sightingResponse.data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <Button>Back</Button>
        </Link>
        <div>
          <h2>Year: {sighting.YEAR}</h2>
          {sighting.MONTH && <h2>Month: {sighting.MONTH}</h2>}
          {sighting.SEASON && <h2>Season: {sighting.SEASON}</h2>}
          {(sighting.COUNTY || sighting.STATE) && (
            <h2>
              Location: {sighting.COUNTY} {sighting.STATE}
            </h2>
          )}
          <p>{sighting.OBSERVED}</p>
        </div>
      </header>
    </div>
  );
}
