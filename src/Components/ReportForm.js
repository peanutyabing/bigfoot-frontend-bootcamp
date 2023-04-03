import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function ReportForm() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (date && location && notes) {
      try {
        const newSighting = await axios.post(
          "http://localhost:3000/sightings",
          {
            date: date,
            location: location,
            notes: notes,
          }
        );
        setDate(new Date());
        setLocation("");
        setNotes("");
        navigate("/");
      } catch (err) {
        console.log(err.message);
      }
    } else {
      alert("Please complete all fields.");
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
            <Form.Control
              type="text"
              placeholder="e.g. Warren County, New Jersey, USA"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            ></Form.Control>
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
