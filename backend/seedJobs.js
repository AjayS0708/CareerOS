import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from './models/Job.js';
import { config } from './config/config.js';

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected for seeding'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const sampleJobs = [
  {
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    companyLogo: null,
    location: 'Bangalore, India',
    locationType: 'hybrid',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    description: 'We are looking for an experienced Full Stack Developer to join our growing team. You will work on cutting-edge web applications using modern technologies.',
    requirements: [
      '5+ years of experience in full stack development',
      'Strong proficiency in React, Node.js, and MongoDB',
      'Experience with cloud platforms (AWS/Azure)',
      'Excellent problem-solving skills',
    ],
    responsibilities: [
      'Design and develop scalable web applications',
      'Collaborate with cross-functional teams',
      'Write clean, maintainable code',
      'Mentor junior developers',
    ],
    skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript', 'REST APIs'],
    salary: {
      min: 1500000,
      max: 2500000,
      currency: 'INR',
      period: 'yearly',
    },
    benefits: ['Health Insurance', 'Flexible Work Hours', 'Remote Work', 'Learning Budget'],
    source: 'manual',
    postedDate: new Date(),
    isActive: true,
    tags: ['javascript', 'fullstack', 'remote-friendly'],
  },
  {
    title: 'Frontend Developer',
    company: 'Infosys Limited',
    location: 'Pune, India',
    locationType: 'onsite',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    description: 'Join our frontend team to build beautiful, responsive user interfaces.',
    requirements: [
      '3+ years of React experience',
      'Strong CSS and HTML skills',
      'Experience with state management',
    ],
    responsibilities: [
      'Build responsive web applications',
      'Implement pixel-perfect designs',
      'Optimize performance',
    ],
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Redux', 'Tailwind CSS'],
    salary: {
      min: 800000,
      max: 1200000,
      currency: 'INR',
      period: 'yearly',
    },
    benefits: ['Health Insurance', 'Paid Time Off'],
    source: 'manual',
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isActive: true,
  },
  {
    title: 'Backend Engineer',
    company: 'FamPay',
    location: 'Bangalore, India',
    locationType: 'remote',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    description: 'Build scalable backend systems for our fintech platform.',
    requirements: [
      '3+ years backend development',
      'Strong knowledge of Node.js',
      'Database design experience',
    ],
    responsibilities: [
      'Design and implement APIs',
      'Optimize database queries',
      'Ensure system reliability',
    ],
    skills: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Microservices'],
    salary: {
      min: 1200000,
      max: 1800000,
      currency: 'INR',
      period: 'yearly',
    },
    benefits: ['Stock Options', 'Health Insurance', 'Remote Work'],
    source: 'manual',
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    isActive: true,
  },
  {
    title: 'Data Analyst',
    company: 'HDFC Bank',
    location: 'Mumbai, India',
    locationType: 'onsite',
    employmentType: 'full-time',
    experienceLevel: 'entry',
    description: 'Analyze data to drive business decisions in the banking sector.',
    requirements: [
      '1-2 years experience in data analysis',
      'Proficiency in SQL and Excel',
      'Knowledge of data visualization tools',
    ],
    responsibilities: [
      'Create reports and dashboards',
      'Analyze business metrics',
      'Present insights to stakeholders',
    ],
    skills: ['SQL', 'Python', 'Tableau', 'Excel', 'Statistics'],
    salary: {
      min: 600000,
      max: 900000,
      currency: 'INR',
      period: 'yearly',
    },
    benefits: ['Health Insurance', 'Retirement Plan'],
    source: 'manual',
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    isActive: true,
  },
  {
    title: 'iOS Developer Intern',
    company: 'Dream11',
    location: 'Mumbai, India',
    locationType: 'hybrid',
    employmentType: 'internship',
    experienceLevel: 'entry',
    description: 'Learn and contribute to our iOS app development.',
    requirements: [
      'Basic knowledge of Swift',
      'Understanding of iOS development',
      'Passion for mobile apps',
    ],
    responsibilities: [
      'Assist in app development',
      'Write clean code',
      'Learn from senior developers',
    ],
    skills: ['Swift', 'iOS', 'Xcode', 'Git'],
    salary: {
      min: 25000,
      max: 35000,
      currency: 'INR',
      period: 'monthly',
    },
    benefits: ['Learning Opportunity', 'Mentorship'],
    source: 'manual',
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isActive: true,
  },
  {
    title: 'DevOps Engineer',
    company: 'Wipro',
    location: 'Hyderabad, India',
    locationType: 'onsite',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    description: 'Lead our DevOps initiatives and infrastructure automation.',
    requirements: [
      '5+ years DevOps experience',
      'Expert in CI/CD pipelines',
      'Cloud infrastructure knowledge',
    ],
    responsibilities: [
      'Manage cloud infrastructure',
      'Implement automation',
      'Ensure system reliability',
    ],
    skills: ['Kubernetes', 'Docker', 'Jenkins', 'AWS', 'Terraform', 'Python'],
    salary: {
      min: 1800000,
      max: 2800000,
      currency: 'INR',
      period: 'yearly',
    },
    benefits: ['Health Insurance', 'Remote Work', 'Training Budget'],
    source: 'manual',
    postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    isActive: true,
  },
  {
    title: 'UI/UX Designer',
    company: 'Zomato',
    location: 'Gurgaon, India',
    locationType: 'hybrid',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    description: 'Design beautiful and intuitive user experiences for millions of users.',
    requirements: [
      '3+ years UI/UX design experience',
      'Strong portfolio',
      'Proficiency in Figma',
    ],
    responsibilities: [
      'Create user-centered designs',
      'Conduct user research',
      'Collaborate with developers',
    ],
    skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Prototyping'],
    salary: {
      min: 1000000,
      max: 1600000,
      currency: 'INR',
      period: 'yearly',
    },
    benefits: ['Food Allowance', 'Health Insurance', 'Flexible Hours'],
    source: 'manual',
    postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    isActive: true,
  },
  {
    title: 'Machine Learning Engineer',
    company: 'Flipkart',
    location: 'Bangalore, India',
    locationType: 'onsite',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    description: 'Build ML models to enhance customer experience on our e-commerce platform.',
    requirements: [
      '4+ years ML experience',
      'Strong Python skills',
      'Experience with TensorFlow/PyTorch',
    ],
    responsibilities: [
      'Develop ML models',
      'Deploy models to production',
      'Optimize model performance',
    ],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Machine Learning', 'Deep Learning'],
    salary: {
      min: 2000000,
      max: 3500000,
      currency: 'INR',
      period: 'yearly',
    },
    benefits: ['Stock Options', 'Health Insurance', 'Learning Budget'],
    source: 'manual',
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    isActive: true,
  },
];

const seedJobs = async () => {
  try {
    // Clear existing jobs
    await Job.deleteMany({});
    console.log('🗑️  Cleared existing jobs');

    // Insert sample jobs
    const jobs = await Job.insertMany(sampleJobs);
    console.log(`✅ Successfully seeded ${jobs.length} jobs`);

    // Display summary
    console.log('\n📊 Jobs Summary:');
    jobs.forEach((job, idx) => {
      console.log(`${idx + 1}. ${job.title} at ${job.company} - ${job.location}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedJobs();
