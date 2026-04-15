import { Router } from 'express';

const router = Router();
let mockUser = null;

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'name, email, and password are required',
    });
  }

  mockUser = {
    id: 101,
    name,
    email,
    password,
  };

  return res.status(201).json({
    success: true,
    message: 'User signed up successfully',
    user: {
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    },
  });
});

router.post('/login', (req, res) => {
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

  if (email !== mockUser.email || password !== mockUser.password) {
    return res.status(401).json({
      success: false,
      error: 'Invalid email or password.',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    token: 'mock-jwt-token-12345',
    user: {
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    },
  });
});

router.post('/logout', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
});

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
