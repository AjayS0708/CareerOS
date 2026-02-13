import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide job title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters'],
    },
    companyLogo: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      required: [true, 'Please provide job location'],
      trim: true,
    },
    locationType: {
      type: String,
      enum: ['remote', 'hybrid', 'onsite'],
      default: 'onsite',
    },
    employmentType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance'],
      required: [true, 'Please specify employment type'],
    },
    experienceLevel: {
      type: String,
      enum: ['entry', 'mid', 'senior', 'lead', 'executive'],
      required: [true, 'Please specify experience level'],
    },
    description: {
      type: String,
      required: [true, 'Please provide job description'],
    },
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    responsibilities: [
      {
        type: String,
        trim: true,
      },
    ],
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    salary: {
      min: {
        type: Number,
        default: null,
      },
      max: {
        type: Number,
        default: null,
      },
      currency: {
        type: String,
        default: 'USD',
      },
      period: {
        type: String,
        enum: ['hourly', 'monthly', 'yearly'],
        default: 'yearly',
      },
    },
    benefits: [
      {
        type: String,
        trim: true,
      },
    ],
    applicationUrl: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      enum: ['manual', 'linkedin', 'indeed', 'glassdoor', 'company-website', 'other'],
      default: 'manual',
    },
    externalId: {
      type: String,
      default: null,
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    applicationCount: {
      type: Number,
      default: 0,
    },
    matchScore: {
      type: Number, // 0-100 score for user match
      default: null,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
jobSchema.index({ title: 'text', company: 'text', description: 'text' });
jobSchema.index({ company: 1, createdAt: -1 });
jobSchema.index({ location: 1 });
jobSchema.index({ employmentType: 1 });
jobSchema.index({ experienceLevel: 1 });
jobSchema.index({ skills: 1 });
jobSchema.index({ isActive: 1, postedDate: -1 });
jobSchema.index({ source: 1, externalId: 1 });

// Virtual for salary display
jobSchema.virtual('salaryDisplay').get(function () {
  if (!this.salary.min && !this.salary.max) return null;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: this.salary.currency,
    maximumFractionDigits: 0,
  });

  if (this.salary.min && this.salary.max) {
    return `${formatter.format(this.salary.min)} - ${formatter.format(this.salary.max)}`;
  }
  
  return formatter.format(this.salary.min || this.salary.max);
});

// Method to increment view count
jobSchema.methods.incrementViewCount = function () {
  return this.updateOne({ $inc: { viewCount: 1 } });
};

// Method to increment application count
jobSchema.methods.incrementApplicationCount = function () {
  return this.updateOne({ $inc: { applicationCount: 1 } });
};

const Job = mongoose.model('Job', jobSchema);

export default Job;
