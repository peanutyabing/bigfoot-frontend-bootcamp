import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../Constants.js";
import { Link, Outlet, useSearchParams, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function SightingSummary() {
  const [sightings, setSightings] = useState([]);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    getSightings();
  }, [searchParams, location]);

  const getSightings = async () => {
    const sightingsRes = await axios.get(
      `${BACKEND_URL}/sightings`
      // , {
      //   params: getSearchParams(),
      // }
    );
    setSightings(sightingsRes.data);
  };

  // const getSearchParams = () => {
  //   const params = Object.fromEntries(searchParams.entries());
  //   for (const key in params) {
  //     if (!params[key]) {
  //       delete params[key];
  //     }
  //   }
  //   return params;
  // };

  const renderSightings = () => {
    if (sightings && sightings.length > 0) {
      return sightings.map((sighting) => (
        <Link to={`/sightings/${sighting.id}`} key={sighting.id}>
          <Card>
            <Card.Body>
              <Card.Title>
                {`${sighting.date.slice(0, 4)}, ${sighting.location}`}
              </Card.Title>
            </Card.Body>
          </Card>
        </Link>
      ));
    } else {
      return "Loading...";
    }
  };

  return (
    <div className="flex-container">
      <Outlet context={getSightings} />
      {renderSightings()}
    </div>
  );
}
