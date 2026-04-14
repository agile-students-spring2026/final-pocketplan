import React, { useState } from 'react';

function SignUpPassword({ onBack, onNext }) {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState('');

  async function handleNextClick() {
    if (!name.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreed) {
      setError('Please agree to the terms and conditions.');
      return;
    }

    setError('');
    const result = await onNext({ name, password });

    if (!result.success) {
      setError(result.error || 'Sign up failed.');
    }
  }

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
          <label htmlFor="signup-name">Name</label>
          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="auth-field">
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="auth-field">
          <label htmlFor="signup-confirm">Confirm Password</label>
          <input
            id="signup-confirm"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="auth-checkbox-row">
          <input
            id="terms"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="terms">T&amp;C I agree to the T&amp;C</label>
        </div>
        {error && (
          <p style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            {error}
          </p>
        )}
        <button type="button" className="auth-btn-primary" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </>
  );
}

export default SignUpPassword;
