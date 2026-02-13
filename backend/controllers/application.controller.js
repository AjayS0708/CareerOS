import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';

// @desc    Get all applications for user
// @route   GET /api/v1/applications
// @access  Private
export const getApplications = async (req, res) => {
  const {
    status,
    priority,
    archived = false,
    search,
    page = 1,
    limit = 20,
    sort = '-createdAt',
  } = req.query;

  // Build query
  const query = {
    user: req.user.id,
    archived: archived === 'true',
  };

  // Filter by status
  if (status) {
    const statuses = status.split(',');
    query.status = { $in: statuses };
  }

  // Filter by priority
  if (priority) {
    query.priority = priority;
  }

  // Search in job snapshot
  if (search) {
    query.$or = [
      { 'jobSnapshot.title': { $regex: search, $options: 'i' } },
      { 'jobSnapshot.company': { $regex: search, $options: 'i' } },
    ];
  }

  // Pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  // Execute query
  const applications = await Application.find(query)
    .populate('job', 'title company location employmentType')
    .sort(sort)
    .skip(skip)
    .limit(limitNum)
    .lean();

  // Get total count
  const total = await Application.countDocuments(query);

  res.status(StatusCodes.OK).json({
    success: true,
    count: applications.length,
    total,
    totalPages: Math.ceil(total / limitNum),
    currentPage: pageNum,
    data: { applications },
  });
};

// @desc    Get single application
// @route   GET /api/v1/applications/:id
// @access  Private
export const getApplication = async (req, res) => {
  const application = await Application.findOne({
    _id: req.params.id,
    user: req.user.id,
  }).populate('job');

  if (!application) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Application not found',
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: { application },
  });
};

// @desc    Create new application
// @route   POST /api/v1/applications
// @access  Private
export const createApplication = async (req, res) => {
  const { jobId, ...applicationData } = req.body;

  // Check if job exists
  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Job not found',
    });
  }

  // Check if application already exists
  const existingApplication = await Application.findOne({
    user: req.user.id,
    job: jobId,
  });

  if (existingApplication) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'You have already applied to this job',
    });
  }

  // Create job snapshot
  const jobSnapshot = {
    title: job.title,
    company: job.company,
    companyLogo: job.companyLogo,
    location: job.location,
    employmentType: job.employmentType,
  };

  // Create application
  const application = await Application.create({
    user: req.user.id,
    job: jobId,
    jobSnapshot,
    ...applicationData,
  });

  // Increment job application count
  await job.incrementApplicationCount();

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Application created successfully',
    data: { application },
  });
};

// @desc    Update application
// @route   PUT /api/v1/applications/:id
// @access  Private
export const updateApplication = async (req, res) => {
  const allowedUpdates = [
    'status',
    'priority',
    'notes',
    'coverLetter',
    'resumeVersion',
    'source',
    'followUpDate',
    'atsScore',
    'matchScore',
    'tags',
  ];

  const updates = {};
  Object.keys(req.body).forEach((key) => {
    if (allowedUpdates.includes(key)) {
      updates[key] = req.body[key];
    }
  });

  const application = await Application.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    updates,
    { new: true, runValidators: true }
  );

  if (!application) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Application not found',
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Application updated successfully',
    data: { application },
  });
};

// @desc    Delete application
// @route   DELETE /api/v1/applications/:id
// @access  Private
export const deleteApplication = async (req, res) => {
  const application = await Application.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!application) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Application not found',
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Application deleted successfully',
  });
};

// @desc    Update application status
// @route   PATCH /api/v1/applications/:id/status
// @access  Private
export const updateStatus = async (req, res) => {
  const { status, notes } = req.body;

  if (!status) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Please provide status',
    });
  }

  const application = await Application.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!application) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Application not found',
    });
  }

  await application.updateStatus(status, notes);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Status updated successfully',
    data: { application },
  });
};

// @desc    Add interview to application
// @route   POST /api/v1/applications/:id/interviews
// @access  Private
export const addInterview = async (req, res) => {
  const application = await Application.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!application) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Application not found',
    });
  }

  await application.addInterview(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Interview added successfully',
    data: { application },
  });
};

// @desc    Update interview
// @route   PUT /api/v1/applications/:id/interviews/:interviewId
// @access  Private
export const updateInterview = async (req, res) => {
  const application = await Application.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!application) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Application not found',
    });
  }

  const interview = application.interviews.id(req.params.interviewId);
  if (!interview) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Interview not found',
    });
  }

  Object.assign(interview, req.body);
  await application.save();

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Interview updated successfully',
    data: { application },
  });
};

// @desc    Add offer to application
// @route   POST /api/v1/applications/:id/offer
// @access  Private
export const addOffer = async (req, res) => {
  const application = await Application.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!application) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Application not found',
    });
  }

  await application.addOffer(req.body);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Offer added successfully',
    data: { application },
  });
};

// @desc    Add contact to application
// @route   POST /api/v1/applications/:id/contacts
// @access  Private
export const addContact = async (req, res) => {
  const application = await Application.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!application) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Application not found',
    });
  }

  application.contacts.push(req.body);
  await application.save();

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Contact added successfully',
    data: { application },
  });
};

// @desc    Archive/Unarchive application
// @route   PATCH /api/v1/applications/:id/archive
// @access  Private
export const toggleArchive = async (req, res) => {
  const application = await Application.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!application) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Application not found',
    });
  }

  application.archived = !application.archived;
  await application.save();

  res.status(StatusCodes.OK).json({
    success: true,
    message: `Application ${application.archived ? 'archived' : 'unarchived'} successfully`,
    data: { application },
  });
};

// @desc    Get application statistics for user
// @route   GET /api/v1/applications/stats
// @access  Private
export const getStats = async (req, res) => {
  const stats = await Application.aggregate([
    { $match: { user: req.user.id, archived: false } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  const total = await Application.countDocuments({
    user: req.user.id,
    archived: false,
  });

  const thisMonth = await Application.countDocuments({
    user: req.user.id,
    archived: false,
    createdAt: {
      $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    },
  });

  const upcomingInterviews = await Application.countDocuments({
    user: req.user.id,
    'interviews.scheduledDate': { $gte: new Date() },
    'interviews.completed': false,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      byStatus: stats,
      total,
      thisMonth,
      upcomingInterviews,
    },
  });
};

// @desc    Get recent applications
// @route   GET /api/v1/applications/recent
// @access  Private
export const getRecentApplications = async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;

  const applications = await Application.find({
    user: req.user.id,
    archived: false,
  })
    .populate('job', 'title company companyLogo')
    .sort('-createdAt')
    .limit(limit)
    .lean();

  res.status(StatusCodes.OK).json({
    success: true,
    count: applications.length,
    data: { applications },
  });
};
