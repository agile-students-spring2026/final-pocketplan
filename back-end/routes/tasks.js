import { Router } from 'express';

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
router.post('/',(req,res)=>{
    const{title, dueDate}=req.body;
    if(!title){
        return res.status(400).json({
            success: false,
            error: 'Title is required',
        });
    }
    const newTask ={
        id: nextId++,
        title,
        completed: false,
        dueDate: dueDate ||null,
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
router.put('/:id',(req, res)=>{
    const id=parseInt(req.params.id);
    const task=tasks.find(t=> t.id === id && t.userId === mockUserId);

    if (!task){
        return res.status(404).json({
            success:false,
            error:'Task Not Found',
        });
    }
    const{title,completed,dueDate}=req.body;
    if(title !== undefined)task.title=title;
    if(completed!== undefined) task.completed=completed;
    if(dueDate!==undefined)task.dueDate=dueDate;
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
