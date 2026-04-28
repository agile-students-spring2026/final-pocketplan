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
    const { name, dueDate, hours, minutes, effort, priority, details } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
    if (typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({
            success: false,
            error: 'Name is required',
        });
    }

    const newTask = {
        id: nextId++,
        name: name.trim(),
        dueDate: dueDate || null,
        hours: Number(hours) || 0,
        minutes: Number(minutes) || 0,
        effort: Number(effort) || 0,
        priority: priority || '',
        details: details || '',
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
    const { name, completed, dueDate, hours, minutes, effort, priority, details } = req.body;

    if (name !== undefined) {
        if (typeof name !== 'string' || !name.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Name cannot be empty',
            });
        }
    
        task.name = name.trim();
    }

    if (completed !== undefined) task.completed = completed;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (hours !== undefined) task.hours = Number(hours) || 0;
    if (minutes !== undefined) task.minutes = Number(minutes) || 0;
    if (effort !== undefined) task.effort = Number(effort) || 0;
    if (priority !== undefined) task.priority = priority;
    if (details !== undefined) task.details = details;
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
