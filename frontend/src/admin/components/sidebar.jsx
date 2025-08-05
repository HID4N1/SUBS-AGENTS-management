import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css"; 
import { useAuth } from "../../auth/context/AuthContext";  // <-- use hook

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user, logout } = useAuth();   // <-- get user & logout from hook
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout(); // if your hook provides logout
    navigate("/admin/login");
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo">Admin Panel</h2>
        </div>

        {/* --- Authenticated User Info --- */}
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            {user?.username?.charAt(0).toUpperCase() || "A"}
          </div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">
              {user?.first_name && user?.last_name
                ? `${user.first_name} ${user.last_name}`
                : user?.username || "Admin"}
            </span>
            <span className="sidebar-user-role">{user?.role || "Admin"}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/agents" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Agents
          </NavLink>
          <NavLink to="/admin/missions" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Missions
          </NavLink>
          <NavLink to="/admin/reservations" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Reservations
          </NavLink>
          <NavLink to="/admin/locations" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Locations
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
