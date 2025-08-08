import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const submitFinalStep = (formData) => {
  return API.post('reservation/final_step/', formData);
};

export const fetchTimeSlots = () => {
  return API.get('reservation/time_slots/');
};

export const fetchLocations = () => {
  return API.get('reservation/locations/');
};

export const fetchMeetingPoints = (locationId) => {
  return API.get(`reservation/meeting_points/${locationId}/`);
}

export const fetchReservationById = (reservationId) => {
  return API.get(`reservation/${reservationId}/`);
};

export default API;
