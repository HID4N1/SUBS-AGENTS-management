import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import "../../styles/ReservationNumberChart.css"; // Ensure you have this CSS file for styling

const ReservationNumberChart = ({ reservations }) => {
  // Transform reservations data into chart format
  // Example: reservations = { total, today, pending, confirmed, cancelled }
  const data = useMemo(() => {
    return [
      { name: "Total", value: reservations.total },
      { name: "Today", value: reservations.today },
      { name: "Pending", value: reservations.pending },
      { name: "Confirmed", value: reservations.confirmed },
      { name: "Cancelled", value: reservations.cancelled },
    ];
  }, [reservations]);

  return (
    <div className="reservation-chart-container">
      <h3>Reservations Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReservationNumberChart;
