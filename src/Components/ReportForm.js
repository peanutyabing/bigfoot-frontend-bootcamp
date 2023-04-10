import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
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
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategories, setNewCategories] = useState([]);
  const [intensityLevels, setIntensityLevels] = useState([]);
  const animatedComponents = makeAnimated();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (date && country && region && notes) {
      const sighting = {
        date: date,
        country: country,
        region: region,
        cityTown: cityTown,
        locationDescription: locationDescription,
        notes: notes,
        categoryIds: selectedCategories.map((cat) => cat.value),
        intensityLevels: intensityLevels,
      };
      const categoriesToAdd = newCategories.map((newOption) => {
        return { name: newOption.label };
      });
      try {
        for (const newCat of categoriesToAdd) {
          const newCatRes = await axios.post(
            `${BACKEND_URL}/categories`,
            newCat
          );
          sighting.categoryIds.push(newCatRes.data.id);
        }
        setNewCategories([]);
      } catch (err) {
        console.log(err.message);
      }
      try {
        const newSighting = await axios.post(
          `${BACKEND_URL}/sightings`,
          sighting
        );
        setDate(new Date());
        setCountry("");
        setRegion("");
        setCityTown("");
        setLocationDescription("");
        setNotes("");
        setSelectedCategories([]);
        navigate("/");
      } catch (err) {
        console.log(err.message);
      }
    } else {
      alert("Please complete all mandatory fields.");
    }
  };

  const handleSelected = (selected) => {
    setSelectedCategories(selected.filter((option) => !option.__isNew__));
    setNewCategories(selected.filter((option) => option.__isNew__));
  };

  const renderIntensityForm = () => {
    const output = [];
    for (let i = 0; i < selectedCategories.length; i++) {
      output.push(
        <div key={i}>
          <div className="label">
            Intensity for "{selectedCategories[i].label}"
          </div>
          <Form.Range
            name={selectedCategories[i].value}
            min="1"
            max="100"
            value={intensityLevels[i]}
            onChange={(e) => {
              const intensityLevelsToUpdate = { ...intensityLevels };
              intensityLevelsToUpdate[i] = e.target.value;
              setIntensityLevels(intensityLevelsToUpdate);
            }}
          />
        </div>
      );
    }
    return output;
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
            <Form.Label>Date and time*</Form.Label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              showTimeSelect
            />
          </Form.Group>
          <Form.Group controlId="location" className="form-group">
            <Form.Label>Where did you see the bigfoot?*</Form.Label>
            <CountryDropdown
              className="select-country"
              value={country}
              onChange={(country) => {
                setCountry(country);
              }}
            />
            <RegionDropdown
              className="select-region"
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
            <Form.Label>Describe the sighting*</Form.Label>
            <Form.Control
              type="text"
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Select labels</Form.Label>
            <CreatableSelect
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={categories}
              defaultValue={selectedCategories}
              onChange={handleSelected}
            />
          </Form.Group>
          <Form.Group className="form-group">
            {renderIntensityForm()}
          </Form.Group>
          <Form.Group className="form-group">
            <Button type="submit">Submit</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
