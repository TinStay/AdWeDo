import React, { useState, useEffect } from "react";
import * as actionTypes from "../../../../store/actions/actionTypes";
import removeIcon from "../../../../assets/removeIcon2.png";
import { Alert, Button } from "react-bootstrap";

import {
  AgeFromSelect,
  AgeToSelect,
  GenderSelect,
  LocationSelect,
  InterestsSelect,
} from "./SelectForms";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

// import SelectPlaces from 'react-select-places';
import { connect } from "react-redux";

function Audience(props) {
  const [location, setLocation] = useState("");
  const [locationList, setLocationList] = useState([]);

  // Errors
  // Production
  // const [errors, setErrors] = useState({
  //     location: "You have to fill this field.",
  //     ageFrom: "You have to fill this field.",
  //     ageTo: "You have to fill this field.",
  // })
  // Development
  const [errors, setErrors] = useState({
    location: "",
    ageFrom: "",
    ageTo: "",
  });

  const [showErrors, setShowErrors] = useState(false);

  // Initial render
  useEffect(() => {
    // Scroll to the top of the form
    props.headingRef.current.scrollIntoView();

    // Load locationList if already saved in redux state
    if (props.audience.location !== null) {
      setLocationList(props.audience.location);
    }
  }, []);

  const onLocationSelect = async (location) => {
    // Create new location entry
    let newLocation = { name: location, id: Date.now() };

    // Copy location list from state
    let newLocationList = [...locationList];

    // Push new location to list
    newLocationList.push(newLocation);

    // Update location list state
    setLocationList(newLocationList);

    // Update redux state
    props.saveLocation(newLocationList);

    // Clear input
    setLocation("");

    // Update error message
    let newErrors = { ...errors };

    if (locationList !== []) {
      newErrors.location = "";
    } else {
      newErrors.location =
        "You have to select at least 1 location of targeting";
    }

    setErrors(newErrors);
  };

  const removeLocation = (e, index) => {
    e.preventDefault();

    // Copy the location list from state
    let newLocationList = [...locationList];

    // Remove the location with index
    newLocationList.splice(index, 1);

    // Update state
    setLocationList(newLocationList);

    // Update redux state
    props.saveLocation(newLocationList);

    // Update error message
    let newErrors = { ...errors };

    if (locationList !== []) {
      newErrors.location = "";
    } else {
      newErrors.location =
        "You have to select at least 1 location of targeting";
    }

    setErrors(newErrors);
  };

  const updateAgeFrom = (option) => {
    let newErrors = { ...errors };
    newErrors.ageFrom = "";

    setErrors(newErrors);

    props.saveAgeFrom(option.value);
  };

  const updateAgeTo = (option) => {
    let newErrors = { ...errors };
    newErrors.ageTo = "";

    setErrors(newErrors);

    props.saveAgeTo(option.value);
  };

  const goToAdPlacements = () => {
    if (errors.location != "" || errors.ageFrom != "" || errors.ageTo != "") {
      setShowErrors(true);
    } else {
      setShowErrors(false);
      props.goToAdPlacements();
    }
  };

  // Alerts
  let ageFromAlert = null;
  if (errors.ageFrom != "" && showErrors) {
    ageFromAlert = (
      <Alert className="alert-danger" variant="danger">
        {errors.ageFrom}
      </Alert>
    );
  }

  let ageToAlert = null;
  if (errors.ageTo != "" && showErrors) {
    ageToAlert = (
      <Alert className="alert-danger" variant="danger">
        {errors.ageTo}
      </Alert>
    );
  }

  return (
    <div className="add-form-group">
      <h3 className="border-bottom add-form-label">Choose your audience</h3>
      <form className="audience-form">
        <div className="row audience-form-location-container ">
          <div className="audience-form-location col-md-12">
            <label>
              Locations targeted by your
              ads:
            </label>
            <PlacesAutocomplete
              value={location}
              onChange={setLocation}
              onSelect={onLocationSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <div class="col-md-6">{props.locationAlert}</div>
                  <input
                    {...getInputProps({ placeholder: "Select a location" })}
                    className="col-md-6 form-control form-control-lg m-0"
                    type="text"
                  />

                  <div className="dropdown">
                    {loading ? <div>...Loading</div> : null}

                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active
                          ? "#deebff"
                          : "#fafaff",
                        padding: "5px",
                        width: "100%",
                        border: "1px solid #dfdfdf",
                        display: suggestions ? "block" : "none",
                        // position: "absolute",
                        wordWrap: "break-word",
                      };

                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
          <div class="col-md-12 row audience-form-location-list mb-0">
            <div class="col-12">
              <h1 className="title my-4">Selected locations:</h1>
            </div>
            <div class="row mx-auto w-100 mb-0">
              {locationList.length !== 0 ? (
                locationList.map((location, index) => {
                  return (
                    <div class="col-12 col-md-4 p-0">
                      <div class="location-box mx-lg-2 mb-3 d-flex justify-content-between">
                        {location.name}
                        {/* <button className="remove-btn btn " onClick={(e) => removeLocation(e, index)}>X</button> */}
                        <i
                          className="fas fa-times remove-btn  "
                          onClick={(e) => removeLocation(e, index)}
                        ></i>
                        {/* <span className="remove-btn btn " onClick={(e) => removeLocation(e, index)} >&#x2613;</span> */}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>You haven't selected any locations yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="audience-form-gender col-md-2 ">
            <label for="gender">Gender: </label>
            <GenderSelect updateGender={(gender) => props.saveGender(gender)} />
          </div>
          <div className="audience-form-age col-md-8">
            <label for="age">Age:</label>
            <div className="d-md-flex">
              <div>
                {ageFromAlert}
                <div className="mr-4 d-md-flex">
                  <p>From</p>
                  <AgeFromSelect
                    ageValue={props.audience.ageFrom}
                    updateAgeFrom={(option) => updateAgeFrom(option)}
                  />
                </div>
              </div>
              <div>
                {ageToAlert}
                <div className="mr-4 d-md-flex">
                  <p>To</p>
                  <AgeToSelect
                    ageValue={props.audience.ageTo}
                    updateAgeTo={(option) => updateAgeTo(option)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="audience-form-countries col-md-10">
            <label for="gender">Interests, keywords, demographics: </label>
            <InterestsSelect
              saveInterests={(interests) => props.saveInterests(interests)}
              selectedInterests={props.audience.interests}
            />
          </div>
        </div>
      </form>
      <div className="d-flex justify-content-end">
        <button onClick={() => props.handleBack()} className="btn btn-back">
          Back
        </button>
        <Button
          variant="contained"
          className="btn btn-continue"
          onClick={() => goToAdPlacements()}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    audience: state.audience,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveLocation: (locationList) =>
      dispatch({ type: actionTypes.SAVE_LOCATION, locationList: locationList }),
    saveGender: (gender) =>
      dispatch({ type: actionTypes.SAVE_GENDER, gender: gender }),
    saveAgeFrom: (value) =>
      dispatch({ type: actionTypes.SAVE_AGE_FROM, value: value }),
    saveAgeTo: (value) =>
      dispatch({ type: actionTypes.SAVE_AGE_TO, value: value }),
    saveInterests: (options) =>
      dispatch({ type: actionTypes.SAVE_INTERESTS, options: options }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Audience);
