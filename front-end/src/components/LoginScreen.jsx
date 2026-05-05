/**
 * LoginScreen Component
 * 
 * This component renders the login form, allowing users to authenticate using their username/email and password.
 * It includes a form with fields for the user's login credentials, a forgot password option, and a log in button
 * 
 **/

import React, { useState } from 'react';

function LoginScreen({ onBack, onLogin, onForgotPassword }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLoginClick() {
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');
    const result = await onLogin(email, password);

    if (!result.success) {
      setError(result.error || 'Login failed.');
    }
  }

  return (
    <>
      <p className="auth-screen-label">Log In</p>
      <div className="auth-card">
        <button type="button" className="auth-back" onClick={onBack}>
          ← Go back
        </button>
        <h1 className="auth-title">Log In</h1>
        <img src="/logo192.png" alt="PocketPlan logo" className="auth-logo" />
        <div className="auth-field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="auth-field">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="auth-checkbox-row">
          <input id="remember" type="checkbox" defaultChecked />
          <label htmlFor="remember">Remember device</label>
        </div>
        {error && (
          <p style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            {error}
          </p>
        )}
        <button type="button" className="auth-btn-primary" onClick={handleLoginClick}>
          Log In
        </button>
        <div className="auth-link-row">
          <button type="button" className="link" onClick={onForgotPassword}>
            Forgot Password?
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginScreen;
