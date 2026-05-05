import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { signupValidation, loginValidation } from '../validation/authValidation.js';
import User from '../models/User.js';

const router = Router();

router.post('/signup', signupValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, password } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, error: 'name, email, and password are required' });
  }

  try {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, error: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: 'User signed up successfully',
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Server error during sign-up.' });
  }
});

router.post('/login', loginValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'email and password are required' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'dev_secret',
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Server error during login.' });
  }
});

router.post('/logout', (req, res) => {
  return res.status(200).json({ success: true, message: 'Logout successful' });
});

router.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: 'email is required' });
  }

  return res.status(200).json({
    success: true,
    message: 'Password reset link sent',
    email,
  });
});

export default router;
