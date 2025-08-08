import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchReservationById } from "../../services/api";

import '../styles/confirmation.css';

import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";

const Confirmation = () => {
  const location = useLocation();
  const { reservationId } = location.state || {};
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReservation = async () => {
      if (!reservationId) {
        setError("No reservation ID provided.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetchReservationById(reservationId);
        setReservation(response.data);
      } catch (err) {
        setError("Failed to fetch reservation info.");
      } finally {
        setLoading(false);
      }
    };
    getReservation();
  }, [reservationId]);

  if (loading) {
    return <div>Loading reservation info...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!reservation) {
    return <div>No reservation data available.</div>;
  }

  return (

    <div className="confirmation">

      <header>
        <Header />
      </header>

        <div className="confirmation-content">
        <h1>Reservation Confirmation</h1>
        <h2>Client Information</h2>
        <p><strong>Name:</strong> {reservation.client_name}</p>
        <p><strong>Phone:</strong> {reservation.client_phone}</p>
        <p><strong>Email:</strong> {reservation.client_email}</p>

        <h2>Location</h2>
        <p><strong>Name:</strong> {reservation.location.name}</p>
        <p><strong>Address:</strong> {reservation.location.address}</p>
        <p><strong>Description:</strong> {reservation.location.description}</p>

        <h2>Meeting Point</h2>
        {reservation.meeting_point ? (
          <>
            <p><strong>Name:</strong> {reservation.meeting_point.name}</p>
            <p><strong>Address:</strong> {reservation.meeting_point.address}</p>
            <p><strong>Description:</strong> {reservation.meeting_point.description}</p>
          </>
        ) : (
          <p>No meeting point selected.</p>
        )}

        <h2>Time Slots</h2>
        <ul>
          {reservation.time_slots.map((slot) => (
            <li key={slot.id}>
              {new Date(slot.start_time).toLocaleString()} - {new Date(slot.end_time).toLocaleString()}
            </li>
          ))}
        </ul>

        <h2>Status</h2>
        <p>{reservation.status}</p>

        <h2>Reservation Date</h2>
        <p>{new Date(reservation.reservation_date).toLocaleString()}</p>


        <Button 
                        onClick={() => console.log('Button clicked')}
                        text={"Go to Home"}
                        className="go-home-button"
                        to="/" 
                        />
        </div>
        
      <footer>
      <Footer />
      </footer>

    </div>
  );
};

export default Confirmation;
