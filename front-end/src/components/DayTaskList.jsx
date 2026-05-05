/**
 * DayTaskList Component
 * 
 * This component takes a list of tasks on a specific date and displays each task along with its priority.
 * Each task includes a name, priority, due date, estimated time of completion, estimated effort, and any additional information.
 * 
 * */


import React from "react";
import { formatDisplayDate } from "../utils/dates";

function DayTaskList({ day, onBack, onAddTask, tasks, onEditTask }) {
  const dayTasks = tasks.filter((task) => task.dueDate === day);
  const displayDate = day ? formatDisplayDate(day) : "";

  return (
    <div className="auth-card">
      <button className="auth-back" onClick={onBack}>
        ← Go back
      </button>

      <h2 className="day-task-title">Tasks for {displayDate}</h2>

      <div className="day-task-box">
        {dayTasks.length === 0 ? (
          <p className="day-empty">No tasks. Tap below to add one!</p>
        ) : (
          dayTasks.map((task, index) => (
            <p
              key={index}
              className="day-task-item"
              onClick={() => onEditTask(task)}
            >
              {task.name}
              {task.priority && (
                <span className={`task-priority-badge priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              )}
            </p>
          ))
        )}
      </div>

      <button className="add-task-btn" onClick={onAddTask}>
        + Add Task
      </button>
    </div>
  );
}

export default DayTaskList;
