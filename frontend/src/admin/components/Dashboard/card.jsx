import React from "react";
import "../../styles/card.css";

const Card = ({ title, value}) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-content">
        <div className="dashboard-card-info">
          <h4 className="dashboard-card-title">{title}</h4>
          <p className="dashboard-card-value">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
