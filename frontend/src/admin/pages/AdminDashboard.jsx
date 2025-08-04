import React, { useState } from "react";
import { useAuth } from '../../auth/context/AuthContext';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <div className="admin-info">
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </header>

        </div>
    );
}

export default AdminDashboard;
