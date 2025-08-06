import React, { useEffect, useState, useMemo } from "react";
import { fetchDashboardStats } from "../../services/adminApi";
import { FaCalendarCheck, FaRocket, FaUsers, FaEye } from "react-icons/fa";
import { Spinner } from "react-bootstrap";  // Add a spinner for loading state
import Card from "../components/Dashboard/card";
import ReservationsTrendChart from "../components/Dashboard/ReservationsTrendChart";
import ReservationNumberChart from "../components/Dashboard/ReservationNumberChart";
import RecentMissions from "../components/Dashboard/RecentMissions";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  


  const totalvisitors = 1000; // Mock total visitors data

  // Transform data for ReservationsTrendChart
  const trendData = useMemo(() => {
    if (!stats?.reservations?.by_date) return [];
    
    // The data is already in correct format from backend
    return stats.reservations.by_date.map(item => ({
      date: item.date,
      count: item.count
    }));
  }, [stats]);

  // // mission lists
  // const missions = useMemo(() => {
  //   return stats?.missions?.recent || [];
  // }, [stats]);
  const dummymissions = [
      { id: 1, name: "Mission Alpha", reservationsNumber: '10', status: "Completed", date: "2023-10-01" },
      { id: 2, name: "Mission Beta", reservationsNumber: '10', status: "In Progress", date: "2023-10-02" },
      { id: 3, name: "Mission Gamma", reservationsNumber: '10', status: "Pending", date: "2023-10-03" }
    ];
  

  
  

  useEffect(() => {
    fetchDashboardStats()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard stats:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      });
  }, []);


  if (loading) return <div className="loading-state"><Spinner animation="border" variant="primary" /></div>;
  if (error) return <div className="error-state">{error}</div>;

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      {/* KPI Cards */}
      <div className="cards-container">
        <Card title="Total Reservations" value={stats.reservations.total} icon={FaCalendarCheck} />
        <Card title="Total Missions" value={stats.missions.total} icon={FaRocket} />
        <Card title="Total Agents" value={stats.agents.total} icon={FaUsers} />
        <Card title="Total Visitors" value={totalvisitors} icon={FaEye} />
      </div>

      {/* Charts */}
      <div className="charts-container">
        <ReservationsTrendChart data={trendData} />
        <ReservationNumberChart reservations={stats.reservations} />
      </div>

      {/* Recent Missions */}
      {/* <RecentMissions missions={missions} /> */}
      <RecentMissions missions={dummymissions} />
    </div>
  );
};

export default AdminDashboard;
