import React, { useState } from 'react';

function Onboarding({ onFinish }) {
  const [classes, setClasses] = useState(['Agile DevOps', 'Network Security']);
  const [commitments, setCommitments] = useState(['XYZ Hackathon', 'Security Seminar']);

  const addClass = () => {
    setClasses([...classes, '']);
  };

  const addCommitment = () => {
    setCommitments([...commitments, '']);
  };

  const handleClassChange = (e, index) => {
    const updatedClasses = [...classes];
    updatedClasses[index] = e.target.value;
    setClasses(updatedClasses);
  };

  const handleCommitmentChange = (e, index) => {
    const updatedCommitments = [...commitments];
    updatedCommitments[index] = e.target.value;
    setCommitments(updatedCommitments);
  };

  return (
    <div className="auth-card">
      <button className="auth-back" onClick={onFinish}>← Go back</button>
      <h2 className="auth-title">Add your Profile</h2>

      <div className="auth-field">
        <label htmlFor="classes">Add classes</label>
        {classes.map((cls, index) => (
          <div key={index} className="auth-field">
            <input
              type="text"
              value={cls}
              onChange={(e) => handleClassChange(e, index)}
              placeholder="Enter class"
              id={`class-${index}`}
            />
          </div>
        ))}
        <button className="auth-btn-primary" onClick={addClass}>+ Add Class</button>
      </div>

      <div className="auth-field">
        <label htmlFor="commitments">Add commitments</label>
        {commitments.map((commitment, index) => (
          <div key={index} className="auth-field">
            <input
              type="text"
              value={commitment}
              onChange={(e) => handleCommitmentChange(e, index)}
              placeholder="Enter commitment"
              id={`commitment-${index}`}
            />
          </div>
        ))}
        <button className="auth-btn-primary" onClick={addCommitment}>+ Add Commitment</button>
      </div>

      <button className="auth-btn-primary" onClick={onFinish}>Done</button>
    </div>
  );
}

export default Onboarding;