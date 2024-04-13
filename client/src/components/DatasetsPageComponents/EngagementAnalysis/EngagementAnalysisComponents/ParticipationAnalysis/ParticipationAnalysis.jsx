import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import './ParticipationAnalysis.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Function to sort data
const sortData = (data, sortBy, sortOrder) => {
  return [...data].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
};

const ParticipationAnalysis = ({ dataset }) => {
  const {
    participation: participationData,
    communication: communicationData,
    pageViews: pageViewsData,
  } = dataset.metrics[0].engagementAndParticipation.engagementInsights;

  // State for data type selection
  const [selectedDataType, setSelectedDataType] = useState('participation');

  // Filtered data based on the selected data type
  const filteredData = useMemo(() => {
    switch (selectedDataType) {
      case 'communication':
        return communicationData;
      case 'pageViews':
        return pageViewsData;
      default:
        return participationData;
    }
  }, [selectedDataType, communicationData, pageViewsData, participationData]);

  // States for filtering
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  // Unique terms and courses for filtering options
  const terms = useMemo(() => [...new Set(participationData.map(item => item.term))], [participationData]);
  const courses = useMemo(() => [...new Set(participationData.filter(item => item.term === selectedTerm).map(item => item.courseId))], [participationData, selectedTerm]);

  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });

  // Filtered participation data based on selected term and course
  const filteredParticipationData = useMemo(() => filteredData.filter(item => (!selectedTerm || item.term === selectedTerm) && (!selectedCourse || item.courseId === selectedCourse)), [filteredData, selectedTerm, selectedCourse]);

  // Participation Over Time aggregated by month
  const participationOverTime = useMemo(() => {
    const aggregatedData = filteredParticipationData.reduce((acc, { date }) => {
      const month = new Date(date).toISOString().substring(0, 7); // YYYY-MM format
      if (!acc[month]) acc[month] = { month, count: 0 };
      acc[month].count += 1;
      return acc;
    }, {});

    return Object.values(aggregatedData).sort((a, b) => a.month.localeCompare(b.month));
  }, [filteredParticipationData]);

  // Use filtered data for sorting
  const sortedParticipationData = useMemo(() => {
    return sortData(filteredParticipationData, sortConfig.key, sortConfig.direction);
  }, [filteredParticipationData, sortConfig]);

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  // Dynamically generate title and table headers based on selected data type
  const dataTypeTitles = {
    participation: 'Participation Over Time',
    communication: 'Communication Over Time',
    pageViews: 'Page Views Over Time',
  };

  const dataTypeTableHeaders = {
    participation: ['Date', 'Interaction Type', 'Details'],
    communication: ['Date', 'Message Type', 'Details'],
    pageViews: ['Date', 'Page ID', 'Page URL'],
  };

  return (
    <div className="participation-analysis">
      <div className="filters">
        <select value={selectedDataType} onChange={(e) => setSelectedDataType(e.target.value)}>
          <option value="participation">Participation</option>
          <option value="communication">Communication</option>
          <option value="pageViews">Page Views</option>
        </select>
        <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)}>
          <option value="">Select Term</option>
          {terms.map(term => <option key={term} value={term}>{term}</option>)}
        </select>
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">Select Course</option>
          {courses.map(course => <option key={course} value={course}>{course}</option>)}
        </select>
      </div>
      <div className="chart-container">
        <h2>{dataTypeTitles[selectedDataType]}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={participationOverTime} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h2>Individual {dataTypeTitles[selectedDataType]}</h2>
        <table>
          <thead>
            <tr>
              {dataTypeTableHeaders[selectedDataType].map(header => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedParticipationData.map((data, index) => (
              <tr key={index}>
                <td>{data.date}</td>
                <td>{data.interactionType || data.messageType || data.pageId}</td>
                {/* <td>{JSON.stringify(data.interactionDetail.url || data.details || data.pageUrl)}</td> Simplification for display */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ParticipationAnalysis.propTypes = {
  dataset: PropTypes.shape({
    metrics: PropTypes.arrayOf(PropTypes.shape({
      engagementAndParticipation: PropTypes.shape({
        engagementInsights: PropTypes.shape({
          participation: PropTypes.arrayOf(PropTypes.object).isRequired,
          communication: PropTypes.arrayOf(PropTypes.object).isRequired,
          pageViews: PropTypes.arrayOf(PropTypes.object).isRequired,
        }).isRequired,
      }).isRequired,
    })).isRequired,
  }).isRequired,
};

export default ParticipationAnalysis;
