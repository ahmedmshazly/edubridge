// EngagementAndParticipation.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './EngagementAndParticipation.css'; 

// Mock data for the chart
const data = [
  { name: 'January', engagement: 4000, participation: 2400 },
  { name: 'February', engagement: 3000, participation: 1398 },
  { name: 'March', engagement: 2000, participation: 9800 },
  { name: 'April', engagement: 2780, participation: 3908 },
  { name: 'May', engagement: 1890, participation: 4800 },
  { name: 'June', engagement: 2390, participation: 3800 },
  { name: 'July', engagement: 3490, participation: 4300 },
];

const EngagementAndParticipation = () => {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="participation" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="engagement" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementAndParticipation;
