import React, {useState} from "react";

function EditTask({onBack, task, onSaveTask, onDeleteTask}){
    const [effort, setEffort] =useState(task ? task.effort : 0);
    const [priority, setPriority] = useState(task ? task.priority : "");
    const[taskName, setTaskName]=useState(task ? task.name : "");
    const [hours, setHours] = useState(task ? task.hours : 1);
    const [minutes, setMinutes] = useState(task ? task.minutes : 10);
    const [ details, setDetails] = useState(task ? task.details : "");

    return(
        <div className="auth-card">
            <button className="auth-back" onClick={onBack}>
                ← Go back
            </button>

            <h2 className="task-title">
                Edit Task
            </h2>
            <label className="task-label">
                Task Name
            </label>
            <input 
                className="task-input" 
                type="text"
                value = {taskName}
                onChange={(e) => setTaskName(e.target.value)}
                
            />

            <label className="task-label">
                Estimated Time to Complete
            </label>
            <p className="task-sub">
                Hours
            </p>
            <input className="task-slider" type="range" min="1" max="5" value={hours} onChange={(e) => setHours(Number(e.target.value))}/>
            <div className="task-numbers">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
            </div>
            <p className="task-sub">
                Minutes
            </p>
            <input className="task-slider" type="range" min="10" max="50" step= "10" value = {minutes} onChange={(e) => setMinutes(Number(e.target.value))}/>
            <div className ="task-numbers">
                <span>10</span>
                <span>20</span>
                <span>30</span>
                <span>40</span>
                <span>50</span>
            </div>
            <label className="task-label">
                Estimated Effort
            </label>
            <div className="star-row">
                <span className={effort >= 1 ? "star active" : "star"} onClick={() => setEffort(1)}>★</span>
                <span className={effort >= 2 ? "star active" : "star"} onClick={() => setEffort(2)}>★</span>
                <span className={effort >= 3 ? "star active" : "star"} onClick={() => setEffort(3)}>★</span>
                <span className={effort >= 4 ? "star active" : "star"} onClick={() => setEffort(4)}>★</span>
                <span className={effort >= 5 ? "star active" : "star"} onClick={() => setEffort(5)}>★</span>
            </div>

            <label className="task-label"> 
                Priority
            </label>
            <div className="priority-row">
                <button className={priority === "Low" ? "priority-btn active-priority" : "priority-btn"}
                    onClick={() => setPriority("Low")}
                    type="button"
                >
                    Low
                </button>
                <button className={priority === "Medium" ? "priority-btn active-priority" : "priority-btn"}
                    onClick={() => setPriority("Medium")}
                    type="button"
                >
                    Medium
                </button>
                <button className={priority === "High" ? "priority-btn active-priority" : "priority-btn"}
                    onClick={() => setPriority("High")}
                    type="button"
                >
                    High
                </button>
            </div>

            <label className="task-label">
                Details
            </label>
            <input className="task-input" type="text" value ={details} onChange={(e) => setDetails(e.target.value)}/>
            <button className="save-btn" onClick={() => onSaveTask({...task, name: taskName, hours: hours, minutes: minutes, effort: effort, priority: priority, details: details,})}>
                Save
            </button>
            <button 
            className = "delete-btn"
            onClick={onDeleteTask}
            > 
            Delete Task 
            </button>
        </div>
    );
}
export default EditTask;