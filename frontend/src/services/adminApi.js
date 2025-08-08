import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/admin_panel"; 

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access - redirect to login or refresh token
      console.error('Authentication error:', error.response.data);
      // Optionally redirect to login or refresh token
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// --- Dashboard Stats ---
export const fetchDashboardStats = async () => {
  const response = await api.get(`/stats/`);
  return response.data;
};

// --- Agents ---
export const fetchAgents = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await api.get(`/agents/?${params.toString()}`);
  return response.data;
};

export const fetchAgentById = async (id) => {
  const response = await api.get(`/agents/${id}/`);
  return response.data;
};

// --- Missions ---
export const fetchMissions = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await api.get(`/missions/?${params.toString()}`);
  return response.data;
};

export const fetchMissionById = async (id) => {
  const response = await api.get(`/missions/${id}/`);
  return response.data;
};

// --- Reservations ---
export const fetchReservations = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await api.get(`/reservations/?${params.toString()}`);
  return response.data;
};

// Locations
export const fetchLocations = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await api.get(`/locations/?${params.toString()}`);
  return response.data;
};

export const fetchLocationById = async (id) => {
  const response = await api.get(`/locations/${id}/`);
  return response.data;
};

export const createLocation = async (locationData) => {
  const response = await api.post(`/locations/`, locationData);
  return response.data;
};

export const updateLocation = async (id, locationData) => {
  const response = await api.put(`/locations/${id}/`, locationData);
  return response.data;
};

export const deleteLocation = async (id) => {
  const response = await api.delete(`/locations/${id}/`);
  return response.data;
};

// Meeting Points
export const fetchMeetingPoints = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await api.get(`/meeting-points/?${params.toString()}`);
  return response.data;
};

export const fetchMeetingPointById = async (id) => {
  const response = await api.get(`/meeting-points/${id}/`);
  return response.data;
};

export const createMeetingPoint = async (meetingPointData) => {
  const response = await api.post(`/meeting-points/`, meetingPointData);
  return response.data;
};

export const assignMeetingPointToLocation = async (locationId, meetingPointId) => {
  const response = await api.post(`/locations/${locationId}/meeting-points/`, {
    meeting_point_id: meetingPointId
  });
  return response.data;
};

export const updateMeetingPoint = async (id, meetingPointData) => {
  const response = await api.put(`/meeting-points/${id}/`, meetingPointData);
  return response.data;
};

export const deleteMeetingPoint = async (id) => {
  const response = await api.delete(`/meeting-points/${id}/`);
  return response.data;
};

export const fetchLocationMeetingPoints = async (locationId) => {
  const response = await api.get(`/locations/${locationId}/meeting-points/`);
  return response.data;
};
