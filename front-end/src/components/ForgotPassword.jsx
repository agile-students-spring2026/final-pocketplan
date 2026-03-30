import { useState } from 'react';

function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  }

  return (
    <>
      <p className="auth-screen-label">Forgot Password</p>
      <div className="auth-card">
        <button type="button" className="auth-back" onClick={onBack}>
          ← Go back
        </button>
        <img src="/logo192.png" alt="PocketPlan logo" className="auth-logo" />
        <h1 className="auth-title">Forgot Password?</h1>

        {submitted ? (
          <p style={{ textAlign: 'center', color: '#374151', fontSize: '0.95rem', lineHeight: '1.5' }}>
            If an account exists for <strong>{email}</strong>, a recovery link has been sent. Check your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1.25rem' }}>
              Enter the email associated with your account and we'll send you a link to reset your password.
            </p>
            <div className="auth-field">
              <label htmlFor="forgot-email">Email</label>
              <input
                id="forgot-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            {error && (
              <p style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                {error}
              </p>
            )}
            <button type="submit" className="auth-btn-primary">
              Send Recovery Link
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default ForgotPassword;
