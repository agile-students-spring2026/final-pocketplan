import React from 'react';

function SignUpPassword({ onBack, onNext }) {
  return (
    <>
      <p className="auth-screen-label">Sign Up - Password</p>
      <div className="auth-card">
        <button type="button" className="auth-back" onClick={onBack}>
          ← Go back
        </button>
        <h1 className="auth-title">Sign Up</h1>
        <img src="/logo192.png" alt="PocketPlan logo" className="auth-logo" />
        <div className="auth-field">
          <label htmlFor="signup-password">Password</label>
          <input id="signup-password" type="password" autoComplete="new-password" />
        </div>
        <div className="auth-field">
          <label htmlFor="signup-confirm">Confirm Password</label>
          <input id="signup-confirm" type="password" autoComplete="new-password" />
        </div>
        <div className="auth-checkbox-row">
          <input id="terms" type="checkbox" defaultChecked />
          <label htmlFor="terms">T&amp;C I agree to the T&amp;C</label>
        </div>
        <button type="button" className="auth-btn-primary" onClick={onNext}>
          Next
        </button>
      </div>
    </>
  );
}

export default SignUpPassword;
