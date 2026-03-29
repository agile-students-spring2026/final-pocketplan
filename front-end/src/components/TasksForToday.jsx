import React from "react";

function TasksForToday({ tasks, onBack, onAddTask, onToggleTask, onOpenEditView }) {
  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="auth-card">
      <button className="auth-back" onClick={onBack}>
        ← Go back
      </button>

      <div className="tasks-today-header">
        <h2 className="day-task-title">Tasks for today:</h2>
        <button className="today-add-btn" onClick={onAddTask} type="button">
          +
        </button>
      </div>

      <div className="day-task-box tasks-for-today-box">
        {incompleteTasks.map((task, index) => (
          <label key={`incomplete-${index}`} className="today-task-row">
            <input
              type="checkbox"
              checked={!!task.completed}
              onChange={() => onToggleTask(task)}
            />
            <span>{task.name}</span>
          </label>
        ))}

        {completedTasks.map((task, index) => (
          <label key={`completed-${index}`} className="today-task-row completed-task-row">
            <input
              type="checkbox"
              checked={!!task.completed}
              onChange={() => onToggleTask(task)}
            />
            <span>{task.name}</span>
          </label>
        ))}
      </div>

      <button className="save-btn" onClick={onOpenEditView} type="button">
        Edit View
      </button>
    </div>
  );
}

export default TasksForToday;