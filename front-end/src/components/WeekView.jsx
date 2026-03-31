import React from "react";

function WeekView({ onBack, onSelectDay, tasks, weekDays, todayISO }) {
  return (
    <div className="auth-card">
      <button className="auth-back" onClick={onBack}>
        ← Go back
      </button>
      <h2 className="week-title">Week View</h2>

      {weekDays.map((day) => {
        const count = tasks.filter((task) => task.dueDate === day.isoDate).length;
        const isToday = day.isoDate === todayISO;
        return (
          <div key={day.isoDate} className={`week-day-group${isToday ? " week-day-today" : ""}`}>
            <div className="week-day-info">
              <button className="week-day-link" onClick={() => onSelectDay(day.isoDate)}>
                {day.dayName}
                {isToday && <span className="week-today-badge">Today</span>}
              </button>
              <span className="week-day-date">{day.monthNum}/{day.dateNum}</span>
            </div>
            <div className="week-empty">
              {count} {count === 1 ? "task" : "tasks"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WeekView;
