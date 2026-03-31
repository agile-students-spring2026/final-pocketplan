import React from "react";

function DayEditView({ tasks, onBack, onSelectTask }) {
  return (
    <div className="auth-card">
      <button className="auth-back" onClick={onBack}>
        ← Go back
      </button>

      <h2 className="week-title">Today's Tasks</h2>

      <div className="day-task-box">
        {tasks.length === 0 ? (
          <p className="day-empty">No tasks.</p>
        ) : (
          tasks.map((task, index) => (
            <p
              key={index}
              className="day-task-item"
              onClick={() => onSelectTask(task)}
            >
              □ {task.name}
            </p>
          ))
        )}
      </div>
    </div>
  );
}

export default DayEditView;