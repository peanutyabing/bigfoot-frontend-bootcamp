import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";

export default function Filter() {
  const navigate = useNavigate();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [season, setSeason] = useState("");
  const [state, setState] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`..?YEAR=${year}&MONTH=${month}&SEASON=${season}&STATE=${state}`);
  };

  return (
    <Modal
      show={true}
      onHide={() => {
        navigate("/");
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Filter sightings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="year">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="text"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="month">
            <Form.Label>Month</Form.Label>
            <Form.Select
              onChange={(e) => {
                setMonth(e.target.value);
              }}
            >
              <option></option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="season">
            <Form.Label>Season</Form.Label>
            <Form.Select
              onChange={(e) => {
                setSeason(e.target.value);
              }}
            >
              <option></option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="state">
            <Form.Label>U.S. State</Form.Label>
            <Form.Control
              type="text"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Button type="submit">Submit</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
