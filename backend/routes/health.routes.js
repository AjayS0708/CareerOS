import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

/**
 * @route   GET /api/v1/health
 * @desc    Health check endpoint
 * @access  Public
 */
router.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    status: 'OK',
    message: 'CareerOS API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

export default router;
