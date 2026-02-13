import express from 'express';
import {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  updateStatus,
  addInterview,
  updateInterview,
  addOffer,
  addContact,
  toggleArchive,
  getStats,
  getRecentApplications,
} from '../controllers/application.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Main routes
router.route('/').get(getApplications).post(createApplication);

router.get('/stats', getStats);
router.get('/recent', getRecentApplications);

router
  .route('/:id')
  .get(getApplication)
  .put(updateApplication)
  .delete(deleteApplication);

// Status management
router.patch('/:id/status', updateStatus);

// Interview management
router.post('/:id/interviews', addInterview);
router.put('/:id/interviews/:interviewId', updateInterview);

// Offer management
router.post('/:id/offer', addOffer);

// Contact management
router.post('/:id/contacts', addContact);

// Archive management
router.patch('/:id/archive', toggleArchive);

export default router;
