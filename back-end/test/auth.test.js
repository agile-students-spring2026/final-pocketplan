import { Router } from 'express';

const router = Router();

// POST /api/auth/signup
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'name, email, and password are required',
    });
  }

  return res.status(201).json({
    success: true,
    message: 'User signed up successfully',
    user: {
      id: 101,
      name,
      email,
    },
  });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'email and password are required',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    token: 'mock-jwt-token-12345',
    user: {
      id: 101,
      name: 'Coco User',
      email,
    },
  });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
});

// POST /api/auth/forgot-password
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      error: 'email is required',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Password reset link sent',
    email,
  });
});

export default router;