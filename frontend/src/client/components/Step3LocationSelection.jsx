import React, { useEffect, useState } from "react";
import { fetchLocations, fetchMeetingPoints } from "../../services/api";

const Step3LocationSelection = ({ formData, handleInputChange }) => {
  const [locations, setLocations] = useState([]);
  const [meetingPoints, setMeetingPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meetingPointsLoading, setMeetingPointsLoading] = useState(false);

  useEffect(() => {
    const getLocations = async () => {
      setLoading(true);
      try {
        const response = await fetchLocations();
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLocations([]);
      }
      setLoading(false);
    };
    getLocations();
  }, []);

  useEffect(() => {
    const getMeetingPoints = async () => {
      if (formData.location) {
        setMeetingPointsLoading(true);
        try {
          const response = await fetchMeetingPoints(formData.location);
          setMeetingPoints(response.data);
          // Reset meeting point when location changes
          handleInputChange("meeting_point", "");
        } catch (error) {
          console.error("Error fetching meeting points:", error);
          setMeetingPoints([]);
        }
        setMeetingPointsLoading(false);
      } else {
        setMeetingPoints([]);
      }
    };

    if (formData.location) {
      getMeetingPoints();
    }
  }, [formData.location]);

  return (
    <section className="form-step step3" aria-labelledby="step3-title">
      <h2 id="step3-title" className="form-step-title">
        Step 3: Location Selection
      </h2>

      <div className="form-group">
        <label htmlFor="locationPicker" className="form-label">
          Choose a location <span className="required">*</span>
        </label>
        <select
          id="locationPicker"
          className="form-select"
          value={formData.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
          required
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name} – {loc.address}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="info-text">Loading locations...</p>}
      {!loading && locations.length === 0 && (
        <p className="info-text">No locations available.</p>
      )}

      {formData.location && (
        <div className="form-group">
          <label htmlFor="meetingPointPicker" className="form-label">
            Choose a meeting point <span className="required">*</span>
          </label>
          <select
            id="meetingPointPicker"
            className="form-select"
            value={formData.meeting_point}
            onChange={(e) => handleInputChange("meeting_point", e.target.value)}
            required
            disabled={meetingPointsLoading || meetingPoints.length === 0}
          >
            <option value="">Select Meeting Point</option>
            {meetingPoints.map((mp) => (
              <option key={mp.id} value={mp.id}>
                {mp.name} – {mp.address}
              </option>
            ))}
          </select>
          
          {meetingPointsLoading && <p className="info-text">Loading meeting points...</p>}
          
          {!meetingPointsLoading && meetingPoints.length === 0 && formData.location && (
            <p className="info-text">No meeting points available for this location.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Step3LocationSelection;
