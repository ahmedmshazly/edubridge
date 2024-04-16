import React, { useState } from 'react';
import './ValidationNotesComponent.css'

const ValidationNotesComponent = ({ validationNotes }) => {
    const [expandedStudentId, setExpandedStudentId] = useState(null);

    const explainNote = (note) => {
        const optional = note.endsWith('(optional)');
        const [studentInfo, courseInfo] = note.split('.courses.');
        const studentId = studentInfo.replace("Student_", "");
        const courseId = courseInfo.split('.')[0];
        const action = optional ? "you might want to check out" : "you needs to review";
        return `For student ${studentId}, ${action} the page views for Course ${courseId}.`;
    };

    const groupedNotes = validationNotes.reduce((acc, note) => {
        const studentId = note.match(/Student_(\d+)/)[1];
        acc[studentId] = acc[studentId] || [];
        acc[studentId].push(explainNote(note));
        return acc;
    }, {});

    const toggleStudent = (studentId) => {
        setExpandedStudentId(prevId => prevId === studentId ? null : studentId);
    };

    return (
        <div className="validation-notes-container">
            {Object.entries(groupedNotes).map(([studentId, notes]) => (
                <div key={studentId} className="student-notes">
                    <button className="student-notes-header" onClick={() => toggleStudent(studentId)}>
                        Student {studentId}
                    </button>
                    {expandedStudentId === studentId && (
                        <div className="notes-container">
                            {notes.map((note, index) => (
                                <div key={index} className="note">
                                    {note}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ValidationNotesComponent;
