/**
 * TaskCompleted Component
 * 
 * This component displays post task survey which collects the total time spent on the task, total effort, and any important notes the user might want to add
 *
 **/

import React, { useState } from "react";

function TaskCompleted({ onBack, onDone, completedTask }) {
  const [hoursSpent, setHoursSpent] = useState(completedTask ? completedTask.hours : 0);
  const [minutesSpent, setMinutesSpent] = useState(completedTask ? completedTask.minutes : 0);
  const [effortRating, setEffortRating] = useState(0);
  const [notes, setNotes] = useState("");

  return (
    <div className="auth-card">
      <button className="auth-back" onClick={onBack}>
        ← Go back
      </button>

      <h1 className="task-title">Task Completed!</h1>
      {completedTask && (
        <p className="task-completed-name">{completedTask.name}</p>
      )}

      <div className="task-label" style={{ marginTop: "20px" }}>
        Time Spent:
      </div>

      <p className="task-sub">Hours <span className="slider-value">{hoursSpent}h</span></p>
      <input
        className="task-slider-hr"
        type="range"
        min="0"
        max="10"
        value={hoursSpent}
        onChange={(e) => setHoursSpent(Number(e.target.value))}
      />
      <div className="task-numbers-hr">
        <span>0</span>
        <span>2</span>
        <span>4</span>
        <span>6</span>
        <span>8</span>
        <span>10</span>
      </div>

      <p className="task-sub">Minutes <span className="slider-value">{minutesSpent}m</span></p>
      <input
        className="task-slider-min"
        type="range"
        min="0"
        max="55"
        step="5"
        value={minutesSpent}
        onChange={(e) => setMinutesSpent(Number(e.target.value))}
      />
      <div className="task-numbers-min">
        <span>0</span>
        <span>15</span>
        <span>30</span>
        <span>45</span>
        <span>55</span>
      </div>

      <label className="task-label">Effort:</label>
      <div className="star-row">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={effortRating >= n ? "star active" : "star"} onClick={() => setEffortRating(n)}>★</span>
        ))}
      </div>

      <label className="task-label">Notes:</label>
      <input
        className="task-input"
        type="text"
        value={notes}
        placeholder="How did it go?"
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        className="save-btn"
        onClick={() =>
          onDone({
            ...completedTask,
            hoursSpent,
            minutesSpent,
            effortRating,
            completionNotes: notes,
          })
        }
      >
        Done
      </button>
    </div>
  );
}

export default TaskCompleted;
