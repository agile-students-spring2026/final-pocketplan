import React, { useState } from "react";

function AddTask({ onBack, onSaveTask, weekDays, initialDate }) {
  const [dueDate, setDueDate] = useState(initialDate || (weekDays && weekDays.find((d) => d.isToday)?.isoDate) || "");
  const [effort, setEffort] = useState(0);
  const [priority, setPriority] = useState("");
  const [taskName, setTaskName] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [details, setDetails] = useState("");

  return (
    <div className="auth-card">
      <button className="auth-back" onClick={onBack}>
        ← Go back
      </button>

      <h2 className="task-title">Add Task</h2>

      {weekDays && (
        <div className="day-picker">
          <p className="task-label" style={{ marginTop: 0 }}>Due Date</p>
          <div className="day-picker-row">
            {weekDays.map((day) => (
              <button
                key={day.isoDate}
                type="button"
                className={`day-picker-btn${dueDate === day.isoDate ? " day-picker-selected" : ""}${day.isToday ? " day-picker-today" : ""}`}
                onClick={() => setDueDate(day.isoDate)}
              >
                <span className="day-picker-short">{day.shortName}</span>
                <span className="day-picker-num">{day.dateNum}</span>
                {day.isToday && <span className="day-picker-dot" />}
              </button>
            ))}
          </div>
        </div>
      )}

      <label className="task-label">Task Name</label>
      <input
        className="task-input"
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="What do you need to do?"
      />

      <label className="task-label">Estimated Time to Complete</label>

      <p className="task-sub">
        Hours <span className="slider-value">{hours}h</span>
      </p>
      <input
        className="task-slider-hr"
        type="range"
        min="0"
        max="5"
        value={hours}
        onChange={(e) => setHours(Number(e.target.value))}
      />
      <div className="task-numbers-hr">
        <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
      </div>

      <p className="task-sub">
        Minutes <span className="slider-value">{minutes}m</span>
      </p>
      <input
        className="task-slider-min"
        type="range"
        min="0"
        max="55"
        step="5"
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
      />
      <div className="task-numbers-min">
        <span>0</span><span>15</span><span>30</span><span>45</span><span>55</span>
      </div>

      <label className="task-label">Estimated Effort</label>
      <div className="star-row">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={effort >= n ? "star active" : "star"} onClick={() => setEffort(n)}>★</span>
        ))}
      </div>

      <label className="task-label">Priority</label>
      <div className="priority-row">
        {["Low", "Medium", "High"].map((p) => (
          <button
            key={p}
            className={priority === p ? "priority-btn active-priority" : "priority-btn"}
            onClick={() => setPriority(p)}
            type="button"
          >
            {p}
          </button>
        ))}
      </div>

      <label className="task-label">Details</label>
      <input
        className="task-input"
        type="text"
        value={details}
        placeholder="Optional notes..."
        onChange={(e) => setDetails(e.target.value)}
      />

      <button
        className="save-btn"
        onClick={() =>
          onSaveTask({
            name: taskName.trim() || "Unnamed Task",
            dueDate,
            hours,
            minutes,
            effort,
            priority,
            details,
          })
        }
      >
        Save
      </button>
    </div>
  );
}

export default AddTask;
