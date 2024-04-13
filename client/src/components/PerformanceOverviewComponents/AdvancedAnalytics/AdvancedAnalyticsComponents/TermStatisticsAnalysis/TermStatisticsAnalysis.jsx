import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { TextField, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import './TermStatisticsAnalysis.css';

const TermStatisticsAnalysis = ({ dataset }) => {
    const { termStatistics } = dataset.metrics[0].overallStats;
    const [selectedTerms, setSelectedTerms] = useState([]);
    const [lineVisibility, setLineVisibility] = useState({
        avgScore: true,
        minScore: true,
        maxScore: true,
        medianScore: true,
    });

    useEffect(() => {
        const uniqueTerms = termStatistics.map(data => data.termId).filter((value, index, self) => self.indexOf(value) === index);
        setSelectedTerms(uniqueTerms);
    }, [termStatistics]);

    const handleTermChange = (event, newValue) => {
        setSelectedTerms(newValue.map(option => option.termId));
    };

    const handleLineVisibilityChange = (event) => {
        setLineVisibility({ ...lineVisibility, [event.target.name]: event.target.checked });
    };

    const uniqueTermsOptions = termStatistics.map(data => ({
        termId: data.termId,
        label: `Term ${data.termId}`,
    })).filter((option, index, self) => index === self.findIndex((t) => t.termId === option.termId));

    const filteredData = termStatistics.filter(data => selectedTerms.includes(data.termId));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`Term: ${label}`}</p>
                    {payload.map((entry, index) => (
                        <p key={`item-${index}`} style={{ color: entry.color }}>
                            {`${entry.name}: ${entry.value}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="term-statistics-container">
            <h1>Term Statistics Analysis</h1>
            <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={uniqueTermsOptions}
                disableCloseOnSelect
                getOptionLabel={(option) => option.label}
                onChange={handleTermChange}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon />}
                            checkedIcon={<CheckBoxIcon />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.label}
                    </li>
                )}
                renderInput={(params) => <TextField {...params} label="Select Terms" placeholder="Terms" />}
                value={uniqueTermsOptions.filter(option => selectedTerms.includes(option.termId))}
            />
            <FormGroup row>
                {Object.keys(lineVisibility).map(key => (
                    <FormControlLabel
                        control={<Checkbox checked={lineVisibility[key]} onChange={handleLineVisibilityChange} name={key} />}
                        label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        key={key}
                    />
                ))}
            </FormGroup>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="termId" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        {lineVisibility.avgScore && <Line type="monotone" dataKey="averageScore" stroke="#8884d8" name="Average Score" />}
                        {lineVisibility.minScore && <Line type="monotone" dataKey="minScore" stroke="#82ca9d" name="Minimum Score" />}
                        {lineVisibility.maxScore && <Line type="monotone" dataKey="maxScore" stroke="#ffc658" name="Maximum Score" />}
                        {lineVisibility.medianScore && <Line type="monotone" dataKey="medianScore" stroke="#d0ed57" name="Median Score" />}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TermStatisticsAnalysis;
