import React from 'react';

function Profile({ profile, onBack, onEditProfile, onLogOut }) {
  return (
    <div className="auth-card">
      <button className="auth-back" onClick={onBack}>← Go back</button>
      <h2 className="auth-title">Profile</h2>

      <div className="user-profile">
        <div className="user-avatar">
          <div className="user-avatar-placeholder">User DP</div>
        </div>

        <div className="analytics-section">
          <h3>Analytics</h3>
          <p>Tasks completed: 50</p>
          <p>Estimation Accuracy: 84%</p>
          <p>Metric #3: X</p>
          <p>Metric #4: Y</p>
        </div>

        <div className="preferences-section">
          <h3>Preferences</h3>
          <div className="preference-item">
            <span>Task urgency:</span>
            <input type="checkbox" />
          </div>
          <div className="preference-item">
            <span>Show deadlines:</span>
            <input type="checkbox" />
          </div>
          <div className="preference-item">
            <span>Dark Mode:</span>
            <input type="checkbox" />
          </div>
          <div className="preference-item">
            <span>Notifications:</span>
            <input type="checkbox" />
          </div>
        </div>

        <div className="actions">
          <button className="auth-btn-primary" onClick={onEditProfile}>Edit Profile</button>
          <button className="auth-btn-primary" onClick={onLogOut}>Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;