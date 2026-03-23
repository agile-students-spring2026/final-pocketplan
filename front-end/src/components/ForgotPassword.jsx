import React from 'react';

function ForgotPassword({ onBack }) {
  return (
    <>
      <p className="auth-screen-label">Forgot Password?</p>
      <div className="auth-card">
        <button type="button" className="auth-back" onClick={onBack}>
          ← Go back
        </button>
        <div className="auth-logo">logo</div>
        <p className="auth-forgot-message">Too bad. See you later</p>
      </div>
    </>
  );
}

export default ForgotPassword;
