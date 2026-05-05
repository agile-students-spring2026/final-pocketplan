import { Router } from 'express';
import { validationResult } from 'express-validator';
import { createTaskValidation, updateTaskValidation } from '../validation/taskValidation.js';
import { verifyToken } from '../middleware/auth.js';
import Task from '../models/Task.js';

const router = Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ dueDate: 1, createdAt: 1 });
    return res.status(200).json({ success: true, tasks });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Could not fetch tasks.' });
  }
});

router.post('/', verifyToken, createTaskValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, dueDate, hours, minutes, effort, priority, details } = req.body;

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Name is required' });
  }

  try {
    const task = await Task.create({
      user: req.user.id,
      name: name.trim(),
      dueDate: dueDate || null,
      hours: Number(hours) || 0,
      minutes: Number(minutes) || 0,
      effort: Number(effort) || 0,
      priority: priority || '',
      details: details || '',
    });

    return res.status(201).json({ success: true, message: 'Task Created Successfully', task });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Could not create task.' });
  }
});

router.put('/:id', verifyToken, updateTaskValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task Not Found' });
    }

    const {
      name, completed, dueDate, hours, minutes, effort, priority, details,
      hoursSpent, minutesSpent, effortRating, completionNotes,
    } = req.body;

    if (name !== undefined) {
      if (typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ success: false, error: 'Name cannot be empty' });
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
    if (hoursSpent !== undefined) task.hoursSpent = Number(hoursSpent);
    if (minutesSpent !== undefined) task.minutesSpent = Number(minutesSpent);
    if (effortRating !== undefined) task.effortRating = Number(effortRating);
    if (completionNotes !== undefined) task.completionNotes = completionNotes;

    await task.save();

    return res.status(200).json({ success: true, message: 'Task Updated Successfully', task });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Could not update task.' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task Not Found' });
    }
    return res.status(200).json({ success: true, message: 'Task Deleted Successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Could not delete task.' });
  }
});

export default router;
