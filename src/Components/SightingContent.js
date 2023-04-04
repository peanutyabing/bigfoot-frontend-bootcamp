import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { BACKEND_URL } from "../Constants.js";
import DatePicker from "react-datepicker";

export default function SightingContent() {
  const [sighting, setSighting] = useState({});
  const [editing, setEditing] = useState(false);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSighting();
  }, []);

  const getSighting = async () => {
    let sightingResponse = await axios.get(`${BACKEND_URL}/sightings/${id}`);
    setSighting(sightingResponse.data);
  };

  const handleChange = (key, value) => {
    const sightingToUpdate = { ...sighting };
    sightingToUpdate[key] = value;
    setSighting(sightingToUpdate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sighting.date && sighting.location && sighting.notes) {
      try {
        const updatedSighting = await axios.put(
          `${BACKEND_URL}/sightings/${id}`,
          sighting
        );
        setEditing(false);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      alert("Please complete all fields.");
    }
  };

  const renderForm = () => {
    return (
      <Form onSubmit={handleSubmit} className="form">
        <Form.Group className="flex-container-form">
          <div>Date: </div>
          <DatePicker
            selected={new Date(sighting.date)}
            onChange={(date) => {
              handleChange("date", date.toString());
            }}
            showTimeSelect
          />
        </Form.Group>
        <Form.Group className="flex-container-form">
          <div>Location: </div>
          <Form.Control
            type="text"
            value={sighting.location}
            onChange={(e) => {
              handleChange("location", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="flex-container-form">
          <Form.Control
            as="textarea"
            rows={8}
            value={sighting.notes}
            onChange={(e) => {
              handleChange("notes", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit">Submit</Button>
        </Form.Group>
      </Form>
    );
  };

  const renderSighting = () => {
    return (
      <div>
        <div>Date: {sighting.date}</div>
        <div>Location: {sighting.location}</div>
        <div>{sighting.notes}</div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex-container">
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              setEditing(true);
            }}
          >
            Edit
          </Button>
        </div>
        {editing ? renderForm() : renderSighting()}
      </header>
    </div>
  );
}
