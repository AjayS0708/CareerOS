import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  logout,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Rate limiter for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for general auth routes
const generalAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public routes with strict rate limiting
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);

// Protected routes with general rate limiting
router.get('/me', protect, generalAuthLimiter, getMe);
router.put('/profile', protect, generalAuthLimiter, updateProfile);
router.put('/change-password', protect, authLimiter, changePassword);
router.post('/logout', protect, logout);

export default router;
