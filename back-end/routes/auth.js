import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();

// TODO: replace mockUser with MongoDB User model once Person 1 (Chris) sets up Mongoose
let mockUser = null;

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'name, email, and password are required',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  mockUser = { id: 101, name, email, password: hashedPassword };

  return res.status(201).json({
    success: true,
    message: 'User signed up successfully',
    user: { id: mockUser.id, name: mockUser.name, email: mockUser.email },
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'email and password are required',
    });
  }

  if (!mockUser) {
    return res.status(401).json({
      success: false,
      error: 'No account found. Please sign up first.',
    });
  }

  if (email !== mockUser.email) {
    return res.status(401).json({ success: false, error: 'Invalid email or password.' });
  }

  const passwordMatch = await bcrypt.compare(password, mockUser.password);
  if (!passwordMatch) {
    return res.status(401).json({ success: false, error: 'Invalid email or password.' });
  }

  const token = jwt.sign(
    { id: mockUser.id, email: mockUser.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: { id: mockUser.id, name: mockUser.name, email: mockUser.email },
  });
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
