import React from "react";

function DayTaskList({day, onBack, onAddTask, tasks, onEditTask}){
    const dayTasks = tasks.filter(task=> task.day === day);
    let content;
    if(dayTasks.length ===0){
        content =<p className="day-empty">
            No tasks.
        </p>

    }
    else{
        content = dayTasks.map((task, index)=> (
            <p 
            key = {index}
            className="day-task-item"
            onClick={() => onEditTask(task)}
            >
                {task.name}
            </p>
        ));
    }
    return(
        <div className="auth-card">
            <button className="auth-back" onClick={onBack}>
                ← Go back
            </button>

            <h2 className = "day-task-title">
                Tasks for {day}:
            </h2>
            <div className="day-task-box">
                {content}
            </div>
            <button className="add-task-btn" onClick={onAddTask}>
                + Add Task
            </button>
        </div>
    );
}

export default DayTaskList;