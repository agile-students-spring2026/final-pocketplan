import React from "react";

function Dashboard({ tasks, todayISO, weekDays, currentDayLabel, onProfileClick, onWeekClick, onTodayClick }) {
  const todayTasks = tasks.filter((task) => task.dueDate === todayISO);
  const upcomingTasks = tasks.filter(
    (task) => task.dueDate > todayISO && weekDays.some((d) => d.isoDate === task.dueDate)
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-top-row">
        <div></div>
        <button className="dashboard-profile-link" onClick={onProfileClick}>
          Profile
        </button>
      </div>

      <h1 className="dashboard-title">Dashboard</h1>
      <p className="current-day">{currentDayLabel}</p>

      <div className="tasks-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">Tasks for today</h2>
          <button className="dashboard-section-link" onClick={onTodayClick} type="button">
            View all →
          </button>
        </div>
        {todayTasks.length === 0 ? (
          <p className="dashboard-empty-text">No tasks for today!</p>
        ) : (
          todayTasks.slice(0, 3).map((task, index) => (
            <p key={index} className="dashboard-task">{task.name}</p>
          ))
        )}
        {todayTasks.length > 3 && (
          <p className="dashboard-empty-text">+{todayTasks.length - 3} more…</p>
        )}
      </div>

      <div className="upcoming-section">
        <h2 className="dashboard-section-title">Coming up this week</h2>
        {upcomingTasks.length === 0 ? (
          <p className="dashboard-empty-text">No upcoming tasks this week!</p>
        ) : (
          upcomingTasks.slice(0, 3).map((task, index) => (
            <p key={index} className="dashboard-task">
              <span className="dashboard-task-day">
                {weekDays.find((d) => d.isoDate === task.dueDate)?.dayName}:
              </span>{" "}
              {task.name}
            </p>
          ))
        )}
      </div>

      <button className="dashboard-week-link" onClick={onWeekClick}>Week View →</button>
    </div>
  );
}

export default Dashboard;
