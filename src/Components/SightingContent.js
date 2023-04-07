import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { BACKEND_URL } from "../Constants.js";
import DatePicker from "react-datepicker";

import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Comments from "./Comments.js";

export default function SightingContent() {
  const [sighting, setSighting] = useState({});
  const [truncated, setTruncated] = useState(true);
  const [editing, setEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  let { id } = useParams();
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

  useEffect(() => {
    getSighting();
  }, [editing]);

  const getSighting = async () => {
    let sightingResponse = await axios.get(`${BACKEND_URL}/sightings/${id}`);
    setSighting(sightingResponse.data);
    setSelectedCategories(
      sightingResponse.data.categories.map((cat) => {
        return { label: cat.name, value: cat.id };
      })
    );
  };

  useEffect(() => {
    getCategoryOptions();
  }, []);

  const getCategoryOptions = async () => {
    const categoriesRes = await axios.get(`${BACKEND_URL}/categories`);
    const options = categoriesRes.data.map((row) => {
      return { value: row.id, label: row.name };
    });
    setCategories(options);
  };

  const renderForm = () => {
    const selectFieldStyles = {
      option: (provided) => ({
        ...provided,
        color: "black",
      }),
    };

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

        <Select
          styles={selectFieldStyles}
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={categories}
          defaultValue={selectedCategories}
          onChange={handleSelected}
        />

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
      const updates = {
        date: sighting.date,
        country: sighting.country,
        region: sighting.region,
        cityTown: sighting.cityTown,
        locationDescription: sighting.locationDescription,
        notes: sighting.notes,
        updatedAt: new Date(),
        categoryIds: selectedCategories.map((cat) => cat.value),
      };
      try {
        const updatedSighting = await axios.put(
          `${BACKEND_URL}/sightings/${id}`,
          updates
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
        {expandCollapseText(sighting.notes)}
        <div className="categories">
          {sighting.categories &&
            sighting.categories.map((cat) => (
              <div className="category font-xs" key={cat.id}>
                #{cat.name}
              </div>
            ))}
        </div>
        <Comments sightingId={id} />
      </div>
    );
  };

  const expandCollapseText = (text) => {
    if (!text) {
      return;
    }
    if (text.length <= 600) {
      return <div className="notes">{text}</div>;
    } else if (truncated) {
      return (
        <div className="notes">
          {text.slice(0, 600)}...
          <div
            className="btn-no-outline"
            onClick={() => {
              setTruncated(false);
            }}
          >
            Read More
          </div>
        </div>
      );
    } else if (text.length > 600 || !truncated) {
      return (
        <div className="notes">
          {text}
          <div
            className="btn-no-outline"
            onClick={() => {
              setTruncated(true);
            }}
          >
            Read Less
          </div>
        </div>
      );
    }
  };

  const handleSelected = (selected) => {
    console.log(selected);
    setSelectedCategories(selected);
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
