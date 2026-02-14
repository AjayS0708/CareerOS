import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatar: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
      default: null,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    experience: {
      type: Number, // Years of experience
      default: 0,
    },
    currentRole: {
      type: String,
      default: null,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
      default: null,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailVerificationToken: String,
    emailVerificationExpire: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
userSchema.index({ createdAt: -1 });

// Virtual for account lock status
userSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    }
  );
};

// Method to increment login attempts (atomic operation to prevent race conditions)
userSchema.methods.incLoginAttempts = async function () {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return await User.findByIdAndUpdate(
      this._id,
      {
        $set: { loginAttempts: 1 },
        $unset: { lockUntil: 1 },
      },
      { new: true }
    );
  }

  const updates = { $inc: { loginAttempts: 1 } };
  const maxAttempts = config.MAX_LOGIN_ATTEMPTS;

  // Lock account after max attempts (atomic check and update)
  const currentAttempts = this.loginAttempts + 1;
  if (currentAttempts >= maxAttempts && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + config.LOCK_TIME };
  }

  return await User.findByIdAndUpdate(this._id, updates, { new: true });
};

// Method to reset login attempts (atomic operation)
userSchema.methods.resetLoginAttempts = async function () {
  return await User.findByIdAndUpdate(
    this._id,
    {
      $set: { loginAttempts: 0 },
      $unset: { lockUntil: 1 },
    },
    { new: true }
  );
};

const User = mongoose.model('User', userSchema);

export default User;
