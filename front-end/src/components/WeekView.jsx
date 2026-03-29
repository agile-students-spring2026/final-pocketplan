import React from "react";

function WeekView({onBack, onSelectDay, tasks}){
    const mondayCount = tasks.filter((task) => task.day === "Monday").length;
    const tuesdayCount = tasks.filter((task) => task.day === "Tuesday").length;
    const wednesdayCount = tasks.filter((task) => task.day === "Wednesday").length;
    const thursdayCount = tasks.filter((task) => task.day === "Thursday").length;
    const fridayCount = tasks.filter((task) => task.day === "Friday").length;
    const saturdayCount = tasks.filter((task) => task.day === "Saturday").length;
    const sundayCount = tasks.filter((task) => task.day === "Sunday").length;
    return(
        <div className="auth-card">
            <button className="auth-back" onClick={onBack}>
                ← Go back
            </button>
            <h2 className="week-title">
                Week View
            </h2>
            <div style={{marginBottom: "40px"}} className="week-day-group">
                <button className="week-day-link" onClick={() => onSelectDay("Today")}>
                Today:
                </button>
                <div className="week-empty">
                    {tasks.filter((task) => task.day === "Today").length}{" "}
                    {tasks.filter((task) => task.day === "Today").length === 1 ? "task" : "tasks"}
                </div>
            </div>
            <div style={{marginBottom: "40px"}} className= "week-day-group">
                <button className="week-day-link" onClick={() => onSelectDay("Monday")}>
                Monday:
                </button>
                <div className="week-empty">{mondayCount} {mondayCount === 1 ? "task" : "tasks"}</div>
            </div>
            <div style={{marginBottom: "40px"}} className= "week-day-group">
                <button className="week-day-link" onClick={() => onSelectDay("Tuesday")}>
                Tuesday:
                </button>
                <div className="week-empty">{tuesdayCount} {tuesdayCount === 1 ? "task" : "tasks"}</div>
            </div>
            <div style={{marginBottom: "40px"}} className= "week-day-group">
                <button className="week-day-link" onClick={() => onSelectDay("Wednesday")}>
                Wednesday:
                </button>
                <div className="week-empty">{wednesdayCount} {wednesdayCount === 1 ? "task" : "tasks"}</div>
            </div>
            <div style={{marginBottom: "40px"}} className= "week-day-group">
                <button className="week-day-link" onClick={() => onSelectDay("Thursday")}>
                Thursday:
                </button>
                <div className="week-empty">{thursdayCount} {thursdayCount === 1 ? "task" : "tasks"}</div>
            </div>
            <div style={{marginBottom: "40px"}} className= "week-day-group">
                <button className="week-day-link" onClick={() => onSelectDay("Friday")}>
                Friday:
                </button>
                <div className="week-empty">{fridayCount} {fridayCount === 1 ? "task" : "tasks"}</div>
            </div>
            <div style={{marginBottom: "40px"}} className= "week-day-group">
                <button className="week-day-link" onClick={() => onSelectDay("Saturday")}>
                Saturday:
                </button>
                <div className="week-empty">{saturdayCount} {saturdayCount === 1 ? "task" : "tasks"}</div>
            </div>
            <div style={{marginBottom: "40px"}} className= "week-day-group">
                <button className="week-day-link" onClick={() => onSelectDay("Sunday")}>
                Sunday:
                </button>
                <div className="week-empty">{sundayCount} {sundayCount === 1 ? "task" : "tasks"}</div>
            </div>
        </div>
    );
}

export default WeekView;