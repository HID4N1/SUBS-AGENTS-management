import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchLocationById,
  fetchLocationMeetingPoints,
  createMeetingPoint,
  updateMeetingPoint,
  deleteMeetingPoint,
} from "../../../services/adminApi";
import MeetingPointCard from "../../components/MeetingPointCard";
import ConfirmDelete from "../../components/ConfirmDelete";

import { ArrowLeft, MapPin, Edit, Trash2 } from "lucide-react";
import "../../styles/LocationDetailsPage.css";

const LocationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [meetingPoints, setMeetingPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMeetingPointModal, setShowMeetingPointModal] = useState(false);
  const [selectedMeetingPoint, setSelectedMeetingPoint] = useState(null);
  const [meetingPointForm, setMeetingPointForm] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    description: ""
  });
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  


  useEffect(() => {
    loadLocationDetails();
  }, [id]);

  const loadLocationDetails = async () => {
    try {
      setLoading(true);
      const [locationData, meetingPointsData] = await Promise.all([
        fetchLocationById(id),
        fetchLocationMeetingPoints(id)
      ]);
      
      setLocation(locationData);
      setMeetingPoints(meetingPointsData);
    } catch (err) {
      setError("Failed to load location details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };
  
    const handleMeetingPointEdit = (meetingPoint) => {
      setSelectedMeetingPoint(meetingPoint);
      setMeetingPointForm({
        name: meetingPoint.name,
        address: meetingPoint.address,
        latitude: meetingPoint.latitude,
        longitude: meetingPoint.longitude,
        description: meetingPoint.description || ""
      });
      setShowMeetingPointModal(true);
    };
  
  const handleMeetingPointDelete = (meetingPoint) => {
    setDeleteItem(meetingPoint);
    setDeleteType("meetingPoint");
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deleteType === "meetingPoint" && deleteItem) {
      try {
        await deleteMeetingPoint(deleteItem.id);
        setMeetingPoints(meetingPoints.filter(mp => mp.id !== deleteItem.id));
        setShowDeleteModal(false);
        setDeleteItem(null);
        setDeleteType("");
      } catch (err) {
        setError("Failed to delete meeting point");
        console.error(err);
      }
    }
  };
  
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteItem(null);
    setDeleteType("");
  };

  const handleMeetingPointSubmit = async (e) => {
    e.preventDefault();
    try {
      const meetingPointData = {
        ...meetingPointForm,
        location_id: location.id  // Include location_id
      };
      
      if (selectedMeetingPoint) {
        // Update existing meeting point
        await updateMeetingPoint(selectedMeetingPoint.id, meetingPointData);
      } else {
        // Create new meeting point
        await createMeetingPoint(meetingPointData);
      }
      
      setShowMeetingPointModal(false); // Close modal after submission
      resetMeetingPointForm(); // Reset form
      loadLocationDetails(); // Reload location details
    } catch (err) {
      setError("Failed to save meeting point");
    }
  };
  

    const resetMeetingPointForm = () => {
      setMeetingPointForm({
        name: "",
        address: "",
        latitude: "",
        longitude: "",
        description: ""
      });
      setSelectedMeetingPoint(null);
    };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading location details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={handleBack} className="btn-secondary">
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="error-container">
        <p>Location not found</p>
        <button onClick={handleBack} className="btn-secondary">
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="location-details-container">
      <div className="max-w-4xl mx-auto">
        <div className="location-details-header">
          <button onClick={handleBack} className="back-btn">
            <ArrowLeft size={20} />
            Back
          </button>
          <h1>{location.name}</h1>
        </div>

        <div className="location-info-card">
          <h2>Location Details</h2>
          <div className="location-info-grid">
            <div className="info-item">
              <strong>Address:</strong>
              <span>{location.address}</span>
            </div>
            <div className="info-item">
              <strong>Description:</strong>
              <span>{location.description || "No description available"}</span>
            </div>
            <div className="info-item">
              <strong>Total Meeting Points:</strong>
              <span>{meetingPoints.length}</span>
            </div>
          </div>
        </div>

      <div className="meeting-points-section">
        <div className="meeting-points-header">
          <h2>Meeting Points ({meetingPoints.length})</h2>
          <button 
            onClick={() => {
              setSelectedMeetingPoint(null);
              setMeetingPointForm({
                name: "",
                address: "",
                latitude: "",
                longitude: "",
                description: ""
              });
              setShowMeetingPointModal(true);
            }}
            className="btn-primary"
          >
            Add New Meeting Point
          </button>
        </div>
        
        {meetingPoints.length > 0 ? (
          <div className="meeting-points-grid">
            {meetingPoints.map((point) => (
              <MeetingPointCard 
                key={point.id} 
                point={point} 
                onEdit={handleMeetingPointEdit}
                onDelete={handleMeetingPointDelete}
              />
            ))}
          </div>
        ) : (
          <div className="no-meeting-points">
            <p>No meeting points available for this location.</p>
            <button 
              onClick={() => setShowMeetingPointModal(true)}
              className="btn-secondary"
            >
              Add First Meeting Point
            </button>
          </div>
        )}
      </div>

      <ConfirmDelete
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        itemType="meeting point"
        itemName={deleteItem?.name || ""}
        confirmText="Delete"
        cancelText="Cancel"
        title="Confirm Delete"
      />

      {showMeetingPointModal && (
        <div className="modal-overlay">
          <div className="modal-content meeting-point-modal">
            <div className="modal-header">
              <h3>{selectedMeetingPoint ? 'Update Meeting Point' : 'Create New Meeting Point'}</h3>
              <button 
                className="close-btn" 
                onClick={() => {
                  setShowMeetingPointModal(false);
                  resetMeetingPointForm();
                }}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleMeetingPointSubmit} className="meeting-point-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={meetingPointForm.name}
                  onChange={(e) => setMeetingPointForm({...meetingPointForm, name: e.target.value})}
                  required
                  placeholder="Enter meeting point name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={meetingPointForm.address}
                  onChange={(e) => setMeetingPointForm({...meetingPointForm, address: e.target.value})}
                  required
                  placeholder="Enter full address"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="latitude">Latitude *</label>
                  <input
                    type="number"
                    id="latitude"
                    name="latitude"
                    value={meetingPointForm.latitude}
                    onChange={(e) => setMeetingPointForm({...meetingPointForm, latitude: e.target.value})}
                    required
                    step="any"
                    placeholder="e.g., 33.5731"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="longitude">Longitude *</label>
                  <input
                    type="number"
                    id="longitude"
                    name="longitude"
                    value={meetingPointForm.longitude}
                    onChange={(e) => setMeetingPointForm({...meetingPointForm, longitude: e.target.value})}
                    required
                    step="any"
                    placeholder="e.g., -7.5898"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={meetingPointForm.description}
                  onChange={(e) => setMeetingPointForm({...meetingPointForm, description: e.target.value})}
                  rows="3"
                  placeholder="Optional description or additional details"
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-primary">
                  {selectedMeetingPoint ? 'Update' : 'Create'} Meeting Point
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => {
                    setShowMeetingPointModal(false);
                    resetMeetingPointForm();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default LocationDetailsPage;
