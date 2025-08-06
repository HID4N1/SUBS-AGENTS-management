import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/admin_panel"; 

// --- Dashboard Stats ---
export const fetchDashboardStats = async () => {
  const response = await axios.get(`${API_BASE_URL}/stats/`);
  return response.data;
};

// --- Agents ---
export const fetchAgents = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await axios.get(`${API_BASE_URL}/agents/?${params.toString()}`);
  return response.data;
};

export const fetchAgentById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/agents/${id}/`);
  return response.data;
};

// --- Missions ---
export const fetchMissions = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await axios.get(`${API_BASE_URL}/missions/?${params.toString()}`);
  return response.data;
};

export const fetchMissionById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/missions/${id}/`);
  return response.data;
};

// --- Reservations ---
export const fetchReservations = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await axios.get(`${API_BASE_URL}/reservations/?${params.toString()}`);
  return response.data;
};

// Locations
// export const Locations = async (filters = {}) => {
//   const params = new URLSearchParams(filters);
//   const response = await axios.get(`${API_BASE_URL}/locations/?${params.toString()}`);
//   return response.data;
// }