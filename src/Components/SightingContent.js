import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, ListGroup } from "react-bootstrap";
import axios from "axios";
import { BACKEND_URL } from "../Constants.js";
import DatePicker from "react-datepicker";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

export default function SightingContent() {
  const [sighting, setSighting] = useState({});
  const [editing, setEditing] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSighting();
  }, []);

  useEffect(() => {
    getComments();
  }, [newComment]);

  const getSighting = async () => {
    let sightingResponse = await axios.get(`${BACKEND_URL}/sightings/${id}`);
    setSighting(sightingResponse.data);
  };

  const getComments = async () => {
    let commentsResponse = await axios.get(
      `${BACKEND_URL}/sightings/${id}/comments`
    );
    setComments(commentsResponse.data);
  };

  const renderForm = () => {
    return (
      <Form onSubmit={handleSubmitSighting} className="form">
        <Form.Group className="flex-container-form">
          <div className="label">Date* </div>
          <DatePicker
            selected={new Date(sighting.date)}
            onChange={(date) => {
              handleChange("date", date.toString());
            }}
            showTimeSelect
          />
        </Form.Group>
        <Form.Group className="flex-container-form">
          <div className="label">Country* </div>
          <CountryDropdown
            value={sighting.country}
            onChange={(country) => {
              handleChange("country", country);
            }}
          />
        </Form.Group>
        <Form.Group className="flex-container-form">
          <div className="label">Region* </div>
          <RegionDropdown
            country={sighting.country}
            value={sighting.region}
            onChange={(region) => {
              handleChange("region", region);
            }}
          />
        </Form.Group>
        <Form.Group className="flex-container-form">
          <div className="label">City/town </div>
          <Form.Control
            type="text"
            value={sighting.cityTown ? sighting.cityTown : ""}
            onChange={(e) => {
              handleChange("cityTown", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="flex-container-form">
          <div className="label">Other location details </div>
          <Form.Control
            type="text"
            value={
              sighting.locationDescription ? sighting.locationDescription : ""
            }
            onChange={(e) => {
              handleChange("locationDescription", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <div className="label">
            What did you see? Please be as detailed as possible*{" "}
          </div>
          <Form.Control
            as="textarea"
            rows={8}
            value={sighting.notes}
            onChange={(e) => {
              handleChange("notes", e.target.value);
            }}
          />
        </Form.Group>
        <div className="label flex-container-form">*Mandatory fields</div>
        <Form.Group>
          <Button type="submit">Submit</Button>
          <Button
            onClick={() => {
              setEditing(false);
            }}
          >
            Cancel
          </Button>
        </Form.Group>
      </Form>
    );
  };

  const handleSubmitSighting = async (e) => {
    e.preventDefault();
    if (
      sighting.date &&
      sighting.country &&
      sighting.region &&
      sighting.notes
    ) {
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
      alert("Please complete all mandatory fields.");
    }
  };

  const handleChange = (key, value) => {
    const sightingToUpdate = { ...sighting };
    sightingToUpdate[key] = value;
    setSighting(sightingToUpdate);
  };

  const renderSighting = () => {
    return (
      <div className="sighting-info">
        <h5>{sighting.date}</h5>
        <h5>
          {sighting.region}, {sighting.country}
        </h5>
        {sighting.cityTown && <div>{sighting.cityTown}</div>}
        {sighting.locationDescription && (
          <div>Detailed Location: {sighting.locationDescription}</div>
        )}
        <div className="notes">{sighting.notes}</div>
        <h5>Comments</h5>
        <ListGroup className="comments-container">{renderComments()}</ListGroup>
        <div className="comments-form">{renderCommentForm()}</div>
      </div>
    );
  };

  const renderComments = () => {
    if (comments.length > 0) {
      return comments.map((comment) => (
        <ListGroup.Item className="comment" key={comment.id}>
          <div className="comment-content">{comment.content}</div>
          <div className="comment-info">{comment.createdAt}</div>
        </ListGroup.Item>
      ));
    } else {
      return <div>No comments yet</div>;
    }
  };

  const renderCommentForm = () => {
    return (
      <Form onSubmit={handleSubmitComment}>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={2}
            value={newComment}
            placeholder="Your comment goes here."
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit">Submit</Button>
        </Form.Group>
      </Form>
    );
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (newComment) {
      try {
        const comment = await axios.post(
          `${BACKEND_URL}/sightings/${id}/comments`,
          { content: newComment, sightingId: id }
        );
        setNewComment("");
      } catch (err) {
        console.log(err.message);
      }
    } else {
      alert("Please write a comment before submitting.");
    }
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
