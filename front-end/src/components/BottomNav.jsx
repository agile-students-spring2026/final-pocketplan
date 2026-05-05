import React from 'react';

function BottomNav({ screen, onDashboard, onWeek, onToday, onProfile }) {
  const items = [
    { id: 'dashboard', label: 'Home', icon: '⊞', onClick: onDashboard },
    { id: 'week',      label: 'Week',  icon: '📅', onClick: onWeek },
    { id: 'today',     label: 'Today', icon: '✓',  onClick: onToday },
    { id: 'profile',   label: 'Profile', icon: '👤', onClick: onProfile },
  ];

  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <button
          key={item.id}
          className={`bottom-nav-item${screen === item.id ? ' bottom-nav-active' : ''}`}
          onClick={item.onClick}
          type="button"
          aria-label={item.label}
        >
          <span className="bottom-nav-icon">{item.icon}</span>
          <span className="bottom-nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;
