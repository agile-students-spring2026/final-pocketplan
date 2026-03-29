import React from "react";

function DeleteTaskConfirm({ task, onBack, onConfirmDelete, onCancel }) {
  return (
    <div className="auth-card">
      <button className="auth-back" onClick={onBack}>
        ← Go back
      </button>

      <h1 className="task-title">Delete Task</h1>

      <p className="delete-confirm-text">
        Are you sure you want to delete the task
      </p>

      <p className="delete-task-name">
        {task ? task.name : "Task name?"}
      </p>

      <button className="save-btn" onClick={onConfirmDelete} type="button">
        Yes
      </button>

      <button className="delete-btn" onClick={onCancel} type="button">
        No
      </button>
    </div>
  );
}

export default DeleteTaskConfirm;