import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import '../../styles/ReservationsTrendChart.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{`Date: ${label}`}</p>
        <p className="tooltip-value">{`Reservations: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const ReservationsTrendChart = ({ data, title = 'Reservations Trend' }) => {
  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (!data || data.length === 0) {
    return (
      <div className="reservation-chart-container">
        <h2>{title}</h2>
        <div className="no-data-message">
          <p>No reservation data available for the selected period.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-chart-container">
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart 
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke="#666"
            fontSize={12}
          />
          <YAxis 
            allowDecimals={false} 
            stroke="#666"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReservationsTrendChart;
