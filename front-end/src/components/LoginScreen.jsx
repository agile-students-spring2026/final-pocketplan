import React from 'react';

function LoginScreen({ onBack, onLogin, onForgotPassword }) {
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
          <input id="login-email" type="email" autoComplete="email" />
        </div>
        <div className="auth-field">
          <label htmlFor="login-password">Password</label>
          <input id="login-password" type="password" autoComplete="current-password" />
        </div>
        <div className="auth-checkbox-row">
          <input id="remember" type="checkbox" defaultChecked />
          <label htmlFor="remember">Remember device</label>
        </div>
        <button type="button" className="auth-btn-primary" onClick={onLogin}>
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
