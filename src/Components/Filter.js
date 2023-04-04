import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

export default function Filter() {
  const navigate = useNavigate();
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`..?date=${year}&country=${country}&&region=${region}`);
  };

  return (
    <Modal
      centered
      show={true}
      onHide={() => {
        navigate("/");
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Search sightings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="year" className="flex-container-form">
            <div className="label">Year</div>
            <Form.Control
              type="text"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="country" className="flex-container-form">
            <div className="label">Country</div>
            <CountryDropdown
              value={country}
              onChange={(country) => {
                setCountry(country);
              }}
            />
          </Form.Group>
          <Form.Group controlId="region" className="flex-container-form">
            <div className="label">Region</div>
            <RegionDropdown
              country={country}
              value={region}
              onChange={(region) => {
                setRegion(region);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Button type="submit">Submit</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
