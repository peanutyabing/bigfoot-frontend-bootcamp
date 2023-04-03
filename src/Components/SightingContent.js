import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { BACKEND_URL } from "../Constants.js";

export default function SightingContent() {
  const [sighting, setSighting] = useState({});
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSighting();
  }, []);

  const getSighting = async () => {
    let sightingResponse = await axios.get(`${BACKEND_URL}/sightings/${id}`);
    setSighting(sightingResponse.data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex-container">
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Button>
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </div>
        <div>
          <h4>Date: {sighting.date}</h4>
          <h4>Location: {sighting.location}</h4>
          <p>{sighting.notes}</p>
        </div>
      </header>
    </div>
  );
}
