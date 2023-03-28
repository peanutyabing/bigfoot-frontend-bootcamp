import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../Constants.js";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function SightingSummary(props) {
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
        <Link to={`/sightings/${index}`} key={index}>
          <Card>
            <Card.Body>
              <Card.Title>
                {`${sighting.SEASON}, ${sighting.YEAR}, ${sighting.STATE}`}
              </Card.Title>
            </Card.Body>
          </Card>
        </Link>
      ));
    } else {
      return "Loading...";
    }
  };
  return <div className="flex-container">{renderSightings()}</div>;
}
