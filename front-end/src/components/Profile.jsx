import React, { useState } from 'react';

function Profile({ profile, tasks, onBack, onEditProfile, onLogOut }) {
  const [darkMode, setDarkMode] = useState(false);
  const [showUrgency, setShowUrgency] = useState(true);
  const [showDeadlines, setShowDeadlines] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const completedTasks = tasks ? tasks.filter((t) => t.completed) : [];
  const totalTasks = tasks ? tasks.length : 0;
  const completionRate = totalTasks > 0
    ? Math.round((completedTasks.length / totalTasks) * 100)
    : 0;

  const handleDarkMode = (e) => {
    setDarkMode(e.target.checked);
    document.body.classList.toggle('dark-mode', e.target.checked);
  };

  return (
    <div className="auth-card">
      <button className="auth-back" onClick={onBack}>← Go back</button>
      <h2 className="auth-title">Profile</h2>

      <div className="user-profile">
        <div className="user-avatar-block">
          <img
            src="https://picsum.photos/seed/pocketplan/64/64"
            alt="User avatar"
            className="user-avatar-img"
          />
          <div className="user-avatar-info">
            <p className="user-avatar-name">{profile.name}</p>
            <p className="user-avatar-email">{profile.email}</p>
          </div>
        </div>

        <div className="profile-section">
          <p className="profile-section-title">Analytics</p>
          <div className="analytics-grid">
            <div className="analytics-stat">
              <div className="analytics-stat-value">{completedTasks.length}</div>
              <div className="analytics-stat-label">Completed</div>
            </div>
            <div className="analytics-stat">
              <div className="analytics-stat-value">{totalTasks}</div>
              <div className="analytics-stat-label">Total Tasks</div>
            </div>
            <div className="analytics-stat">
              <div className="analytics-stat-value">{completionRate}%</div>
              <div className="analytics-stat-label">Completion Rate</div>
            </div>
            <div className="analytics-stat">
              <div className="analytics-stat-value">{totalTasks - completedTasks.length}</div>
              <div className="analytics-stat-label">Remaining</div>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <p className="profile-section-title">Preferences</p>
          <div className="preference-item">
            <span>Task urgency</span>
            <input
              type="checkbox"
              checked={showUrgency}
              onChange={(e) => setShowUrgency(e.target.checked)}
            />
          </div>
          <div className="preference-item">
            <span>Show deadlines</span>
            <input
              type="checkbox"
              checked={showDeadlines}
              onChange={(e) => setShowDeadlines(e.target.checked)}
            />
          </div>
          <div className="preference-item">
            <span>Dark mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleDarkMode}
            />
          </div>
          <div className="preference-item">
            <span>Notifications</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          </div>
        </div>

        <div className="profile-actions">
          <button className="auth-btn-primary" onClick={onEditProfile}>Edit Profile</button>
          <button className="auth-btn-secondary" onClick={onLogOut}>Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
