import React, { useState } from "react";

function TaskCompleted({ onBack, onDone, completedTask }) {
  const [hoursSpent, setHoursSpent] = useState(3);
  const [minutesSpent, setMinutesSpent] = useState(30);
  const [difficulty, setDifficulty] = useState(0);
  const [notes, setNotes] = useState("");

  return (
    <div className="auth-card">
      <button className="auth-back" onClick={onBack}>
        ← Go back
      </button>

      <h1 className="task-title">Task Completed!</h1>

      <div className="task-label" style={{ marginTop: "20px" }}>
        Time Spent:
      </div>

      <p className="task-sub">Hours</p>
      <input
        className="task-slider"
        type="range"
        min="1"
        max="5"
        value={hoursSpent}
        onChange={(e) => setHoursSpent(Number(e.target.value))}
      />
      <div className="task-numbers">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </div>

      <p className="task-sub">Minutes</p>
      <input
        className="task-slider"
        type="range"
        min="10"
        max="50"
        step="10"
        value={minutesSpent}
        onChange={(e) => setMinutesSpent(Number(e.target.value))}
      />
      <div className="task-numbers">
        <span>10</span>
        <span>20</span>
        <span>30</span>
        <span>40</span>
        <span>50</span>
      </div>

      <label className="task-label">Difficulty:</label>
      <div className="star-row">
        <span className={difficulty >= 1 ? "star active" : "star"} onClick={() => setDifficulty(1)}>★</span>
        <span className={difficulty >= 2 ? "star active" : "star"} onClick={() => setDifficulty(2)}>★</span>
        <span className={difficulty >= 3 ? "star active" : "star"} onClick={() => setDifficulty(3)}>★</span>
        <span className={difficulty >= 4 ? "star active" : "star"} onClick={() => setDifficulty(4)}>★</span>
        <span className={difficulty >= 5 ? "star active" : "star"} onClick={() => setDifficulty(5)}>★</span>
      </div>

      <label className="task-label">Notes:</label>
      <input
        className="task-input"
        type="text"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        className="save-btn"
        onClick={() =>
          onDone({
            ...completedTask,
            hoursSpent,
            minutesSpent,
            difficulty,
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