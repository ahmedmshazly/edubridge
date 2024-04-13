import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tooltip';
import './OverviewSection.css'


const SummaryCard = ({ title, value, tooltipContent }) => {
  return (
    <div className="card" data-tip data-for={title}>
      <Tooltip id={title} place="top" effect="solid">
        {tooltipContent}
      </Tooltip>
      <div className="card-icon">
        {/* Icon selection based on title, you might use a library like react-icons */}
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
};


const OverviewSection = ({ dataset }) => {

  const tooltipContents = {
    "Total Participation": "Shows the total number of participatory actions by students in selected term and course.",
    "Unique Page Views": "Indicates how many times course pages have been viewed, reflecting content engagement.",
    "Total Communications": "Counts all communication actions, highlighting student-instructor interaction."
  };

  const { engagementInsights } = dataset.metrics[0].engagementAndParticipation;
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [summary, setSummary] = useState({
    totalParticipation: 0,
    uniquePageViews: 0,
    totalCommunications: 0,
  });
  const [terms, setTerms] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Filter the dataset based on the selected term and course
    const filteredParticipation = engagementInsights.participation.filter(item => item.term === selectedTerm && item.courseId === selectedCourse);
    const filteredPageViews = engagementInsights.pageViews.filter(item => item.term === selectedTerm && item.courseId === selectedCourse);
    const filteredCommunication = engagementInsights.communication.filter(item => item.term === selectedTerm && item.courseId === selectedCourse);

    // Recalculate summary based on filtered data
    const totalParticipation = filteredParticipation.length;
    const uniquePageViews = filteredPageViews.reduce((acc, cur) => acc + cur.viewCount, 0);
    const totalCommunications = filteredCommunication.length;

    setSummary({ totalParticipation, uniquePageViews, totalCommunications });
  }, [selectedTerm, selectedCourse, engagementInsights.participation, engagementInsights.pageViews, engagementInsights.communication]);

  useEffect(() => {
    const uniqueTerms = new Set(engagementInsights.participation.map(item => item.term));
    setTerms([...uniqueTerms]);

    if (uniqueTerms.size > 0) {
      const initialTerm = [...uniqueTerms][0];
      setSelectedTerm(initialTerm);

      const relatedCourses = engagementInsights.participation
        .filter(item => item.term === initialTerm)
        .map(item => item.courseId);
      const uniqueCourses = [...new Set(relatedCourses)];
      setCourses(uniqueCourses);

      if (uniqueCourses.length > 0) {
        setSelectedCourse(uniqueCourses[0]);
      }
    }

    const totalParticipation = engagementInsights.participation.length;
    const uniquePageViews = engagementInsights.pageViews.reduce((acc, cur) => acc + cur.viewCount, 0);
    const totalCommunications = engagementInsights.communication.length;

    setSummary({ totalParticipation, uniquePageViews, totalCommunications });
  }, [engagementInsights]);

  useEffect(() => {
    const relatedCourses = engagementInsights.participation
      .filter(item => item.term === selectedTerm)
      .map(item => item.courseId);
    const uniqueCourses = [...new Set(relatedCourses)];
    setCourses(uniqueCourses);

    if (uniqueCourses.length > 0) {
      setSelectedCourse(uniqueCourses[0]);
    } else {
      setSelectedCourse('');
    }
  }, [selectedTerm, engagementInsights.participation]);

  const handleTermChange = (e) => {
    setSelectedTerm(e.target.value);
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  return (
    <div className="overview-section">
      <div className="filters">
        <select value={selectedTerm} onChange={handleTermChange}>
          {terms.map(term => (
            <option key={term} value={term}>{term}</option>
          ))}
        </select>
        <select value={selectedCourse} onChange={handleCourseChange}>
          {courses.map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
      </div>
      <div className="summary-cards">
        {Object.entries(summary).map(([key, value]) => (
          <SummaryCard
            key={key}
            title={key}
            value={value}
            tooltipContent={tooltipContents[key]}
          />
        ))}
      </div>
    </div>
  );
};

OverviewSection.propTypes = {
  dataset: PropTypes.shape({
    metrics: PropTypes.arrayOf(PropTypes.shape({
      engagementAndParticipation: PropTypes.shape({
        engagementInsights: PropTypes.shape({
          participation: PropTypes.array.isRequired,
          pageViews: PropTypes.array.isRequired,
          communication: PropTypes.array.isRequired,
        }).isRequired,
      }).isRequired,
    })).isRequired,
  }).isRequired,
};

export default OverviewSection;
