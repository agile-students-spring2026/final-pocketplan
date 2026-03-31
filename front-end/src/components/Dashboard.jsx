import React from "react";

function Dashboard({ currentDay, tasks, onProfileClick, onWeekClick, onAddTask }) {
  const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const todayTasks = tasks.filter((task) => task.day === "Today");
  const upcomingTasks = DAYS_ORDER.flatMap((day) =>
    tasks.filter((task) => task.day === day).map((task) => ({ ...task, day }))
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

      <p className="current-day">{currentDay}</p>

      <div className="tasks-section">
        <h2 className="dashboard-section-title">Tasks for today</h2>
        {todayTasks.length === 0 ? (
          <p className="dashboard-empty-text">No tasks for today!</p>
        ) : (
          todayTasks.map((task, index) => (
            <p key={index} className="dashboard-task">{task.name}</p>
          ))
        )}
      </div>

      <div className="upcoming-section">
        <div className="dashboard-coming-row">
          <h2 className="dashboard-section-title">Coming up next</h2>
        </div>

        {upcomingTasks.length === 0 ? (
          <p className="dashboard-empty-text">No upcoming tasks!</p>
        ) : (
          upcomingTasks.map((task, index) => (
            <p key={index} className="dashboard-task">
              <span style={{ color: "#6b7280", fontSize: "0.8rem", marginRight: "0.5rem" }}>{task.day}</span>
              {task.name}
            </p>
          ))
        )}
      </div>

      <button className="auth-btn-primary" onClick={onAddTask}>Add Task</button>
      <button className="dashboard-week-link" onClick={onWeekClick}>Week View →</button>
    </div>
  );
}

export default Dashboard;