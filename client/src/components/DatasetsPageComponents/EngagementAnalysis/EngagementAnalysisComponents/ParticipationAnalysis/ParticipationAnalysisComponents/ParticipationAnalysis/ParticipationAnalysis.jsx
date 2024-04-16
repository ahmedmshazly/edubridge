import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import 'ParticipationAnalysis.css'
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ParticipationAnalysis = ({ participationData }) => {

  const participationOverTime = participationData.reduce((acc, { date, interactionType }) => {
    const dateString = new Date(date).toISOString().split('T')[0]; // Normalize date to YYYY-MM-DD
    if (!acc[dateString]) acc[dateString] = { date: dateString, count: 0 };
    acc[dateString].count += 1;
    return acc;
  }, {});

  // Interaction Type Breakdown
  const interactionTypeBreakdown = participationData.reduce((acc, { interactionType }) => {
    if (!acc[interactionType]) acc[interactionType] = { name: interactionType, value: 0 };
    acc[interactionType].value += 1;
    return acc;
  }, {});

  return (
    <div className="participation-analysis">
      <div className="chart-container">
        <h2>Participation Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={Object.values(participationOverTime)}>
            <XAxis dataKey="date" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-container">
        <h2>Interaction Type Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={Object.values(interactionTypeBreakdown)} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {
                Object.values(interactionTypeBreakdown).map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
            <RechartsTooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {}
    </div>
  );
};

ParticipationAnalysis.propTypes = {
  participationData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ParticipationAnalysis;
