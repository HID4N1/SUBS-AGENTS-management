import React from "react";
import "../../styles/RecentMissions.css";

const RecentMissions = ({ missions }) => {
  if (!missions || missions.length === 0) {
    return <div className="recent-missions-empty">No recent missions available.</div>;
  }

  return (
    <div className="recent-missions">
      <h2>Recent Missions</h2>
      <table className="missions-table">
        <thead>
          <tr>
            <th>Mission</th>
            <th>Agent</th>
            <th>Reservations Number</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission, index) => (
            <tr key={index}>
              <td>{mission.name}</td>
              <td>{mission.agent}</td>
              <td>{mission.reservationsNumber || 0}</td>
              <td>{new Date(mission.date).toLocaleDateString()}</td>
              <td>
                <span className={`status-badge status-${mission.status.toLowerCase()}`}>
                  {mission.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentMissions;
