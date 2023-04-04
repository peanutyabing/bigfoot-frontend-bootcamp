import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import axios from "axios";
import { BACKEND_URL } from "../Constants.js";

export default function ReportForm() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [cityTown, setCityTown] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (date && country && region && notes) {
      try {
        const newSighting = await axios.post(`${BACKEND_URL}/sightings`, {
          date: date,
          country: country,
          region: region,
          cityTown: cityTown,
          locationDescription: locationDescription,
          notes: notes,
        });
        setDate(new Date());
        setCountry("");
        setRegion("");
        setCityTown("");
        setLocationDescription("");
        setNotes("");
        navigate("/");
      } catch (err) {
        console.log(err.message);
      }
    } else {
      alert("Please complete all mandatory fields.");
    }
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
        <Modal.Title>Report a sighting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="date" className="form-group">
            <Form.Label>Date and time</Form.Label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              showTimeSelect
            />
          </Form.Group>
          <Form.Group controlId="location" className="form-group">
            <Form.Label>Where did you see the bigfoot?</Form.Label>
            <CountryDropdown
              value={country}
              onChange={(country) => {
                setCountry(country);
              }}
            />
            <RegionDropdown
              country={country}
              value={region}
              onChange={(region) => {
                setRegion(region);
              }}
            />
            <Form.Control
              type="text"
              placeholder="City or town (if applicable)"
              value={cityTown}
              onChange={(e) => {
                setCityTown(e.target.value);
              }}
            />
            <Form.Control
              type="text"
              placeholder="Other location details (if applicable)"
              value={locationDescription}
              onChange={(e) => {
                setLocationDescription(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="notes" className="form-group">
            <Form.Label>Describe the sighting</Form.Label>
            <Form.Control
              type="text"
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="form-group">
            <Button type="submit">Submit</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
