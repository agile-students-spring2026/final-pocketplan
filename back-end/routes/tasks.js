import { Router } from 'express';
import { validationResult } from 'express-validator';
import { createTaskValidation, updateTaskValidation } from '../validation/taskValidation.js';

const router = Router();

// selma implement task routes here
// GET    /api/tasks          – list all tasks for the logged-in user
// POST   /api/tasks          – create a new task
// PUT    /api/tasks/:id      – update a task
// DELETE /api/tasks/:id      – delete a task

//mock
let tasks =[];
let nextId=1;

const mockUserId=101;

//get
router.get('/',(req,res)=>{
    const userTasks=tasks.filter(task=>task.userId===mockUserId);
    return res.status(200).json({
        success: true,
        tasks: userTasks,
    });
});
//post
router.post('/', createTaskValidation, (req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
    const{name, dueDate, hours, minutes, effort, priority, details}=req.body;
    const newTask ={
        id: nextId++,
        name,
        dueDate: dueDate || null,
        hours: hours ?? 0,
        minutes: minutes ?? 0,
        effort: effort ?? '',
        priority: priority ?? '',
        details: details ?? '',
        completed: false,
        userId: mockUserId,
    };
    tasks.push(newTask);
    return res.status(201).json({
        success: true,
        message: 'Task Created Successfully',
        task: newTask,
    });
});
//put
router.put('/:id', updateTaskValidation, (req, res)=>{
    const id=parseInt(req.params.id);
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
    const task=tasks.find(t=> t.id === id && t.userId === mockUserId);

    if (!task){
        return res.status(404).json({
            success:false,
            error:'Task Not Found',
        });
    }
    const{name, completed, dueDate, hours, minutes, effort, priority, details}=req.body;
    if (name !== undefined) task.name = name;
    if (completed !== undefined) task.completed = completed;
    if (hours !== undefined) task.hours = hours;
    if (minutes !== undefined) task.minutes = minutes; 
    if(details !== undefined)task.details=details;
    if (effort !== undefined) task.effort = effort;
    if (priority !== undefined) task.priority = priority;
    if(dueDate !== undefined) task.dueDate = dueDate;


    return res.status(200).json({
        success:true,
        message:'Task Updated Successfully',
        task,
    });
});
//delete
router.delete('/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const index=tasks.findIndex(
        t => t.id===id&& t.userId === mockUserId
    );
    if(index=== -1){
        return res.status(404).json({
            success:false,
            error: 'Task Not Found',
        });
    }
    tasks.splice(index,1);
    return res.status(200).json({
        success:true,
        message:'Task Deleted Successfully',
    });
});
export default router;
