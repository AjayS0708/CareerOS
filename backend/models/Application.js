import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Application must belong to a user'],
      index: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Application must be for a job'],
      index: true,
    },
    // Job snapshot (in case job is deleted)
    jobSnapshot: {
      title: String,
      company: String,
      companyLogo: String,
      location: String,
      employmentType: String,
    },
    status: {
      type: String,
      enum: [
        'saved',
        'applied',
        'in-review',
        'shortlisted',
        'interview-scheduled',
        'interviewed',
        'offer',
        'accepted',
        'rejected',
        'withdrawn',
      ],
      default: 'saved',
      index: true,
    },
    appliedDate: {
      type: Date,
      default: null,
    },
    source: {
      type: String,
      enum: ['direct', 'linkedin', 'indeed', 'glassdoor', 'referral', 'other'],
      default: 'direct',
    },
    coverLetter: {
      type: String,
      default: null,
    },
    resumeVersion: {
      type: String, // Reference to resume version used
      default: null,
    },
    notes: {
      type: String,
      default: null,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    contacts: [
      {
        name: String,
        role: String,
        email: String,
        phone: String,
        linkedIn: String,
        notes: String,
      },
    ],
    timeline: [
      {
        status: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        notes: String,
        automated: {
          type: Boolean,
          default: false,
        },
      },
    ],
    interviews: [
      {
        type: {
          type: String,
          enum: ['phone', 'video', 'onsite', 'technical', 'hr', 'behavioral', 'other'],
          required: true,
        },
        scheduledDate: {
          type: Date,
          required: true,
        },
        duration: Number, // in minutes
        location: String,
        meetingLink: String,
        interviewers: [
          {
            name: String,
            role: String,
            email: String,
          },
        ],
        notes: String,
        completed: {
          type: Boolean,
          default: false,
        },
        feedback: String,
      },
    ],
    offer: {
      salary: Number,
      currency: {
        type: String,
        default: 'USD',
      },
      equity: String,
      benefits: [String],
      startDate: Date,
      deadline: Date,
      notes: String,
    },
    rejectionReason: {
      type: String,
      default: null,
    },
    followUpDate: {
      type: Date,
      default: null,
    },
    atsScore: {
      type: Number, // 0-100
      default: null,
    },
    matchScore: {
      type: Number, // 0-100
      default: null,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    archived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound indexes
applicationSchema.index({ user: 1, status: 1, createdAt: -1 });
applicationSchema.index({ user: 1, archived: 1, createdAt: -1 });
applicationSchema.index({ user: 1, job: 1 }, { unique: true }); // One application per job per user

// Virtual for days since applied
applicationSchema.virtual('daysSinceApplied').get(function () {
  if (!this.appliedDate) return null;
  const diffTime = Math.abs(Date.now() - this.appliedDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Pre-save middleware to update applied date
applicationSchema.pre('save', function (next) {
  // Set applied date when status changes to 'applied'
  if (this.isModified('status') && this.status === 'applied' && !this.appliedDate) {
    this.appliedDate = new Date();
  }

  // Add to timeline
  if (this.isModified('status')) {
    this.timeline.push({
      status: this.status,
      date: new Date(),
      automated: true,
    });
  }

  next();
});

// Method to update status
applicationSchema.methods.updateStatus = async function (newStatus, notes = null) {
  this.status = newStatus;
  this.timeline.push({
    status: newStatus,
    date: new Date(),
    notes,
    automated: false,
  });
  return this.save();
};

// Method to add interview
applicationSchema.methods.addInterview = async function (interviewData) {
  this.interviews.push(interviewData);
  if (this.status === 'applied' || this.status === 'in-review' || this.status === 'shortlisted') {
    this.status = 'interview-scheduled';
  }
  return this.save();
};

// Method to add offer
applicationSchema.methods.addOffer = async function (offerData) {
  this.offer = offerData;
  this.status = 'offer';
  return this.save();
};

const Application = mongoose.model('Application', applicationSchema);

export default Application;
