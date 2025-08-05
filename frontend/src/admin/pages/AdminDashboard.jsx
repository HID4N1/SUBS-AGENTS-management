import React, { useEffect, useState } from "react";
import { fetchDashboardStats } from "../../services/adminApi";

import Card from "../components/Dashboard/card";
// import AgentActivityChart from "../../components/Dashboard/AgentActivityChart";
// import MissionTrendChart from "..components/Dashboard/MissionTrendChart";
import ReservationNumberChart from "../components/Dashboard/ReservationNumberChart";
// import RecentMissions from "../../components/Dashboard/RecentMissions";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard stats:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (!stats) return <div>No data available</div>;

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      {/* KPI Cards */}
      <div className="cards-container">
        <Card title="Total Reservations" value={stats.reservations.total} />
        <Card title="Total Missions" value={stats.missions.total} />
        <Card title="Total Agents" value={stats.agents.total} />
      </div>

      {/* Charts */}
      <div className="charts-container">
        {/* <AgentActivityChart activeAgents={stats.agents.active_today} /> */}
        {/* <MissionTrendChart missions={stats.missions} /> */}
        <ReservationNumberChart reservations={stats.reservations} />
      </div>

      {/* Location Summary */}
      <div className="locations-summary">
        <h2>Reservations by Location</h2>
        <ul>
          {stats.locations_summary.map((loc, index) => (
            <li key={index}>
              {loc.location}: {loc.reservations}
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Missions */}
      {/* <RecentMissions /> */}
    </div>
  );
};

export default AdminDashboard;
