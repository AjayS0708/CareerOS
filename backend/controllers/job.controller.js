import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';

// @desc    Get all jobs with filters
// @route   GET /api/v1/jobs
// @access  Public
export const getJobs = async (req, res) => {
  const {
    search,
    location,
    locationType,
    employmentType,
    experienceLevel,
    skills,
    company,
    minSalary,
    maxSalary,
    source,
    page = 1,
    limit = 20,
    sort = '-postedDate',
  } = req.query;

  // Build query
  const query = { isActive: true };

  // Text search
  if (search) {
    query.$text = { $search: search };
  }

  // Filter by location
  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }

  // Filter by location type
  if (locationType) {
    query.locationType = locationType;
  }

  // Filter by employment type
  if (employmentType) {
    const types = employmentType.split(',');
    query.employmentType = { $in: types };
  }

  // Filter by experience level
  if (experienceLevel) {
    const levels = experienceLevel.split(',');
    query.experienceLevel = { $in: levels };
  }

  // Filter by skills
  if (skills) {
    const skillsArray = skills.split(',');
    query.skills = { $in: skillsArray };
  }

  // Filter by company
  if (company) {
    query.company = { $regex: company, $options: 'i' };
  }

  // Filter by salary
  if (minSalary) {
    query['salary.min'] = { $gte: parseInt(minSalary) };
  }
  if (maxSalary) {
    query['salary.max'] = { $lte: parseInt(maxSalary) };
  }

  // Filter by source
  if (source) {
    query.source = source;
  }

  // Pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  // Execute query
  const jobs = await Job.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limitNum)
    .lean();

  // Get total count for pagination
  const total = await Job.countDocuments(query);

  res.status(StatusCodes.OK).json({
    success: true,
    count: jobs.length,
    total,
    totalPages: Math.ceil(total / limitNum),
    currentPage: pageNum,
    data: { jobs },
  });
};

// @desc    Get single job
// @route   GET /api/v1/jobs/:id
// @access  Public
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Job not found',
    });
  }

  // Increment view count
  await job.incrementViewCount();

  res.status(StatusCodes.OK).json({
    success: true,
    data: { job },
  });
};

// @desc    Create new job (Admin only in production)
// @route   POST /api/v1/jobs
// @access  Private
export const createJob = async (req, res) => {
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Job created successfully',
    data: { job },
  });
};

// @desc    Update job
// @route   PUT /api/v1/jobs/:id
// @access  Private
export const updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Job not found',
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Job updated successfully',
    data: { job },
  });
};

// @desc    Delete job
// @route   DELETE /api/v1/jobs/:id
// @access  Private
export const deleteJob = async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);

  if (!job) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Job not found',
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Job deleted successfully',
  });
};

// @desc    Get job recommendations for user
// @route   GET /api/v1/jobs/recommendations
// @access  Private
export const getRecommendations = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;

  // For now, return latest jobs
  // TODO: Implement ML-based recommendations based on user profile
  const jobs = await Job.find({ isActive: true })
    .sort('-postedDate')
    .limit(limit)
    .lean();

  res.status(StatusCodes.OK).json({
    success: true,
    count: jobs.length,
    data: { jobs },
  });
};

// @desc    Get trending jobs
// @route   GET /api/v1/jobs/trending
// @access  Public
export const getTrendingJobs = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;

  // Get jobs with highest view counts in the last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const jobs = await Job.find({
    isActive: true,
    postedDate: { $gte: sevenDaysAgo },
  })
    .sort('-viewCount -applicationCount')
    .limit(limit)
    .lean();

  res.status(StatusCodes.OK).json({
    success: true,
    count: jobs.length,
    data: { jobs },
  });
};

// @desc    Get job statistics
// @route   GET /api/v1/jobs/stats
// @access  Public
export const getJobStats = async (req, res) => {
  const stats = await Job.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: null,
        totalJobs: { $sum: 1 },
        avgSalaryMin: { $avg: '$salary.min' },
        avgSalaryMax: { $avg: '$salary.max' },
        totalApplications: { $sum: '$applicationCount' },
        totalViews: { $sum: '$viewCount' },
      },
    },
  ]);

  const byEmploymentType = await Job.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: '$employmentType',
        count: { $sum: 1 },
      },
    },
  ]);

  const byExperienceLevel = await Job.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: '$experienceLevel',
        count: { $sum: 1 },
      },
    },
  ]);

  const byLocationType = await Job.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: '$locationType',
        count: { $sum: 1 },
      },
    },
  ]);

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      overall: stats[0] || {},
      byEmploymentType,
      byExperienceLevel,
      byLocationType,
    },
  });
};
