import React, { useState } from 'react';

function Onboarding({ onBack, onFinish }) {
  const [classes, setClasses] = useState([]);
  const [commitments, setCommitments] = useState([]);

  const addClass = () => {
    setClasses([...classes, '']);
  };

  const addCommitment = () => {
    setCommitments([...commitments, '']);
  };

  const handleClassChange = (e, index) => {
    const updated = [...classes];
    updated[index] = e.target.value;
    setClasses(updated);
  };

  const handleCommitmentChange = (e, index) => {
    const updated = [...commitments];
    updated[index] = e.target.value;
    setCommitments(updated);
  };

  const removeClass = (index) => {
    setClasses(classes.filter((_, i) => i !== index));
  };

  const removeCommitment = (index) => {
    setCommitments(commitments.filter((_, i) => i !== index));
  };

  return (
    <div className="auth-card">
      <button className="auth-back" onClick={onBack}>← Go back</button>
      <h2 className="auth-title">Set Up Your Profile</h2>
      <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1.25rem', textAlign: 'center' }}>
        Add your classes and commitments so PocketPlan can help you schedule smarter.
      </p>

      <div className="auth-field">
        <label>Classes</label>
        {classes.map((cls, index) => (
          <div key={index} className="onboarding-item-row">
            <input
              type="text"
              value={cls}
              onChange={(e) => handleClassChange(e, index)}
              placeholder="e.g. Intro to Python"
              id={`class-${index}`}
            />
            <button
              type="button"
              className="onboarding-remove-btn"
              onClick={() => removeClass(index)}
              aria-label="Remove class"
            >
              ✕
            </button>
          </div>
        ))}
        <button className="auth-btn-secondary" type="button" onClick={addClass}>
          + Add Class
        </button>
      </div>

      <div className="auth-field">
        <label>Commitments</label>
        {commitments.map((commitment, index) => (
          <div key={index} className="onboarding-item-row">
            <input
              type="text"
              value={commitment}
              onChange={(e) => handleCommitmentChange(e, index)}
              placeholder="e.g. Weekly team meeting"
              id={`commitment-${index}`}
            />
            <button
              type="button"
              className="onboarding-remove-btn"
              onClick={() => removeCommitment(index)}
              aria-label="Remove commitment"
            >
              ✕
            </button>
          </div>
        ))}
        <button className="auth-btn-secondary" type="button" onClick={addCommitment}>
          + Add Commitment
        </button>
      </div>

      <button className="auth-btn-primary" onClick={onFinish}>
        Done
      </button>
    </div>
  );
}

export default Onboarding;
