import express from 'express';
import {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getRecommendations,
  getTrendingJobs,
  getJobStats,
} from '../controllers/job.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getJobs);
router.get('/trending', getTrendingJobs);
router.get('/stats', getJobStats);
router.get('/:id', getJob);

// Protected routes
router.post('/', protect, createJob);
router.put('/:id', protect, updateJob);
router.delete('/:id', protect, deleteJob);
router.get('/recommendations', protect, getRecommendations);

export default router;
