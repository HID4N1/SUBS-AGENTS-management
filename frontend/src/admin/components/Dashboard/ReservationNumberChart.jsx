import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "../../styles/ReservationNumberChart.css";
const color = {
  color: "#333",
};

const ReservationNumberChart = ({ reservations }) => {
  const data = useMemo(() => {
    return [
      { name: "Pending", value: reservations.pending },
      { name: "Confirmed", value: reservations.confirmed },
      { name: "Cancelled", value: reservations.cancelled },
    ];
  }, [reservations]);

  return (
    <div className="reservation-chart-container">
      <h3 style={color}>Reservations Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#38bdf8" barSize={50} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReservationNumberChart;
