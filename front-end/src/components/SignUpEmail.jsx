/**
 * SignUpEmail Component
 * 
 * This component renders the first step of the user sign-up process, where users provide their email address.
 * After entering the email, users can proceed to the next step to provide other information such as a password.
 * 
 **/

import React, { useState } from 'react';

function SignUpEmail({ onNext, onGoLogin }) {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleNextClick() {
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    onNext(email);
  }
  
  return (
    <>
      <p className="auth-screen-label">Sign Up - Email</p>
      <div className="auth-card">
        <h1 className="auth-title">Sign up</h1>
        <img src="/logo192.png" alt="PocketPlan logo" className="auth-logo"/>
        <div className="auth-field">
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && (
          <p style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            {error}
          </p>
        )}
        <button type="button" className="auth-btn-primary" onClick={handleNextClick}>
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
