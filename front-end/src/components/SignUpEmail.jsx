import React from 'react';

function SignUpEmail({ onNext, onGoLogin }) {
  return (
    <>
      <p className="auth-screen-label">Sign Up - Email</p>
      <div className="auth-card">
        <h1 className="auth-title">Sign up</h1>
        <div className="auth-logo">logo</div>
        <div className="auth-field">
          <label htmlFor="signup-email">Email</label>
          <input id="signup-email" type="email" autoComplete="email" />
        </div>
        <button type="button" className="auth-btn-primary" onClick={onNext}>
          Next
        </button>
        <div className="auth-link-row">
          Already have an account?{' '}
          <button type="button" className="link" onClick={onGoLogin}>
            Log In
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUpEmail;
