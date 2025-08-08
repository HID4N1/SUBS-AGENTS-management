import React from 'react';
import { MapPin, Edit, Trash2 } from 'lucide-react';
import "../styles/MeetingPointCard.css"

const MeetingPointCard = ({ point, onEdit, onDelete }) => {
  return (
    <div className="meeting-point-card">
      <div className="meeting-point-header">
        <div className="meeting-point-title">
          <h3>{point.name}</h3>
        </div>
        <div className="meeting-point-actions">
          {onEdit && (
            <button 
              onClick={() => onEdit(point)} 
              className="action-btn edit-btn"
              title="Edit meeting point"
            >
              <Edit size={16} />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={() => onDelete(point)} 
              className="action-btn delete-btn"
              title="Delete meeting point"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
      <div className="meeting-point-content">
        <p className="meeting-point-address">
          <strong>Address:</strong> {point.address}
        </p>
        {point.description && (
          <p className="meeting-point-description">
            <strong>Description:</strong> {point.description}
          </p>
        )}
        <p className="meeting-point-coordinates">
          <strong>Coordinates:</strong> {point.latitude}, {point.longitude}
        </p>
      </div>
    </div>
  );
};

export default MeetingPointCard;
