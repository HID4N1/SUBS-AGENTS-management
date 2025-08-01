import React, { useEffect, useState } from "react";
import { fetchTimeSlots } from '../../services/api';

const Step2TimeSlot = ({ formData, handleInputChange }) => {
  const [allTimeSlots, setAllTimeSlots] = useState([]);
  const [uniqueDays, setUniqueDays] = useState([]);
  const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all time slots on mount
  useEffect(() => {
    const fetchAllSlots = async () => {
      setLoading(true);
      try {
        const response = await fetchTimeSlots();
        setAllTimeSlots(response.data);
        // Extract unique days from time slots
        const daysSet = new Set(
          response.data.map(slot => new Date(slot.start_time).toISOString().split('T')[0])
        );
        setUniqueDays(Array.from(daysSet));
      } catch (error) {
        console.error('Error fetching time slots:', error);
        setAllTimeSlots([]);
        setUniqueDays([]);
      }
      setLoading(false);
    };
    fetchAllSlots();
  }, []);

  // Filter time slots when selected_day changes
  useEffect(() => {
    if (formData.selected_day) {
      const filtered = allTimeSlots.filter(
        slot => new Date(slot.start_time).toISOString().split('T')[0] === formData.selected_day
      );
      setFilteredTimeSlots(filtered);
    } else {
      setFilteredTimeSlots([]);
    }
  }, [formData.selected_day, allTimeSlots]);

  const handleDayChange = (e) => {
    handleInputChange('selected_day', e.target.value);
    // Reset selected time slot when day changes
    handleInputChange('time_slots', []);
  };

  const handleRadioChange = (id) => {
    handleInputChange('time_slots', [id]);
  };

  return (
    <div>
      <h2>Step 2: Time Slot Selection</h2>
      <label htmlFor="dayPicker">Select a day:</label>
      <select id="dayPicker" value={formData.selected_day} onChange={handleDayChange}>
        <option value="">-- Select a day --</option>
        {uniqueDays.map(day => (
          <option key={day} value={day}>
            {new Date(day).toLocaleDateString()}
          </option>
        ))}
      </select>
      {loading && <p>Loading time slots...</p>}
      {!loading && filteredTimeSlots.length === 0 && formData.selected_day && (
        <p>No time slots available for the selected day.</p>
      )}
      {!loading && !formData.selected_day && <p>Please select a day to see available time slots.</p>}
      {!loading && filteredTimeSlots.length > 0 && (
        <div>
          {filteredTimeSlots.map((slot) => (
            <div key={slot.id}>
              <input
                type="radio"
                name="timeSlot"
                value={slot.id}
                checked={formData.time_slots.includes(slot.id)}
                onChange={() => handleRadioChange(slot.id)}
              />
              <label>
                {new Date(slot.start_time).toLocaleTimeString()} - {new Date(slot.end_time).toLocaleTimeString()}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Step2TimeSlot;
