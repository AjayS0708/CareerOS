import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'User already exists with this email',
    });
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate token
  const token = user.generateAuthToken();

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Registration successful',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
      token,
    },
  });
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Please provide email and password',
    });
  }

  // Find user and include password
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  // Check if account is locked
  if (user.isLocked) {
    return res.status(StatusCodes.FORBIDDEN).json({
      success: false,
      message: 'Account is temporarily locked due to multiple failed login attempts. Please try again later.',
    });
  }

  // Check password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    // Increment login attempts
    await user.incLoginAttempts();

    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  // Reset login attempts on successful login
  if (user.loginAttempts > 0) {
    await user.resetLoginAttempts();
  }

  // Generate token
  const token = user.generateAuthToken();

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        location: user.location,
        bio: user.bio,
        skills: user.skills,
        experience: user.experience,
        currentRole: user.currentRole,
        isEmailVerified: user.isEmailVerified,
      },
      token,
    },
  });
};

// @desc    Get current user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'User not found',
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        location: user.location,
        bio: user.bio,
        skills: user.skills,
        experience: user.experience,
        currentRole: user.currentRole,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    },
  });
};

// @desc    Update user profile
// @route   PUT /api/v1/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  const allowedUpdates = [
    'name',
    'phone',
    'location',
    'bio',
    'skills',
    'experience',
    'currentRole',
    'avatar',
  ];

  const updates = {};
  Object.keys(req.body).forEach((key) => {
    if (allowedUpdates.includes(key)) {
      updates[key] = req.body[key];
    }
  });

  const user = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'User not found',
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        location: user.location,
        bio: user.bio,
        skills: user.skills,
        experience: user.experience,
        currentRole: user.currentRole,
      },
    },
  });
};

// @desc    Change password
// @route   PUT /api/v1/auth/change-password
// @access  Private
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Please provide current password and new password',
    });
  }

  const user = await User.findById(req.user.id).select('+password');

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'User not found',
    });
  }

  // Verify current password
  const isPasswordCorrect = await user.comparePassword(currentPassword);

  if (!isPasswordCorrect) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Current password is incorrect',
    });
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Password changed successfully',
  });
};

// @desc    Logout user (client-side token removal)
// @route   POST /api/v1/auth/logout
// @access  Private
export const logout = async (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Logout successful',
  });
};
