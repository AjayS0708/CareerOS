import React, { useState, useEffect } from 'react';
import { Search, MapPin, DollarSign, Briefcase, X, Heart, ExternalLink, Filter } from 'lucide-react';
import { Card, Button, Badge, Input, Loader } from '../components/common';
import { getJobs, trackJobRedirect } from '../services/jobService';
import { createApplication } from '../services/applicationService';
import { toast } from 'react-hot-toast';

const mockJobs = [
  {
    _id: 'mock-1',
    company: 'Google',
    title: 'Frontend Developer',
    location: 'Bengaluru',
    type: 'full-time',
    requiredSkills: ['JavaScript', 'React.js', 'CSS', 'TypeScript'],
    salary: { min: 1000000, max: 1200000, currency: 'INR' },
    applyUrl: 'https://careers.google.com',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'mock-2',
    company: 'Flipkart',
    title: 'Junior UI Engineer',
    location: 'Hyderabad',
    type: 'full-time',
    requiredSkills: ['React.js', 'Tailwind', 'HTML', 'REST'],
    salary: { min: 900000, max: 1100000, currency: 'INR' },
    applyUrl: 'https://www.flipkartcareers.com',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'mock-3',
    company: 'Amazon',
    title: 'Software Engineer I',
    location: 'Gurugram',
    type: 'full-time',
    requiredSkills: ['JavaScript', 'React.js', 'Node.js'],
    salary: { min: 900000, max: 1200000, currency: 'INR' },
    applyUrl: 'https://www.amazon.jobs',
    createdAt: new Date().toISOString(),
  },
];

const JobSearchPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState(new Set());
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    minSalary: '',
    maxSalary: '',
    experience: '',
    skills: [],
    type: '',
  });
  const [skillInput, setSkillInput] = useState('');
  const [sortBy, setSortBy] = useState('relevant');
  const [emailAlerts, setEmailAlerts] = useState(false);

  // Fetch jobs on mount and when filters change
  useEffect(() => {
    fetchJobs();
  }, [filters, sortBy, searchQuery]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = {
        search: searchQuery,
        location: filters.location,
        minSalary: filters.minSalary,
        maxSalary: filters.maxSalary,
        employmentType: filters.type,
        experienceLevel: filters.experience,
        skills: filters.skills.length > 0 ? filters.skills.join(',') : undefined,
        sort: sortBy,
      };

      // Remove empty params
      Object.keys(params).forEach(key => {
        if (!params[key]) delete params[key];
      });

      const data = await getJobs(params);
      const responseJobs = data?.data?.jobs || data?.data || [];
      setJobs(Array.isArray(responseJobs) ? responseJobs : []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs(mockJobs);
      toast.error('Failed to load jobs. Showing sample listings.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (job) => {
    try {
      // Track redirect
      await trackJobRedirect(job._id);

      // Open job application URL in new tab
      if (job.applyUrl) {
        window.open(job.applyUrl, '_blank');
      }

      // Create application entry in database
      const applicationData = {
        jobId: job._id,
        jobSnapshot: {
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary,
          type: job.type,
          description: job.description,
          requirements: job.requirements,
        },
        status: 'applied',
        source: job.source || 'CareerOS',
        appliedAt: new Date(),
      };

      await createApplication(applicationData);
      toast.success(`Applied to ${job.company}!`);
    } catch (error) {
      console.error('Error applying to job:', error);
      toast.error('Failed to save application');
    }
  };

  const handleSaveJob = async (job) => {
    try {
      const newSavedJobs = new Set(savedJobs);
      
      if (savedJobs.has(job._id)) {
        newSavedJobs.delete(job._id);
        toast.success('Job removed from saved list');
      } else {
        // Create a saved application
        const applicationData = {
          jobId: job._id,
          jobSnapshot: {
            title: job.title,
            company: job.company,
            location: job.location,
            salary: job.salary,
            type: job.type,
            description: job.description,
            requirements: job.requirements,
          },
          status: 'saved',
          source: job.source || 'CareerOS',
        };

        await createApplication(applicationData);
        newSavedJobs.add(job._id);
        toast.success('Job saved successfully!');
      }
      
      setSavedJobs(newSavedJobs);
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error('Failed to save job');
    }
  };

  const addSkillFilter = () => {
    if (skillInput.trim() && !filters.skills.includes(skillInput.trim())) {
      setFilters({
        ...filters,
        skills: [...filters.skills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const removeSkillFilter = (skill) => {
    setFilters({
      ...filters,
      skills: filters.skills.filter(s => s !== skill),
    });
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      minSalary: '',
      maxSalary: '',
      experience: '',
      skills: [],
      type: '',
    });
    setSearchQuery('');
  };

  const getMatchBadge = (job) => {
    // Calculate match score based on user skills (mock logic for now)
    const score = Math.random();
    
    if (score > 0.75) {
      return { variant: 'success', label: 'Strong Match', icon: '⭐⭐' };
    } else if (score > 0.5) {
      return { variant: 'info', label: 'Good Match', icon: '⭐⭐' };
    } else {
      return { variant: 'warning', label: 'Above Average', icon: '⚡' };
    }
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Not disclosed';
    
    const { min, max, currency } = salary;
    const symbol = currency === 'INR' ? '₹' : '$';
    
    if (min && max) {
      return `${symbol}${(min / 100000).toFixed(1)}L - ${symbol}${(max / 100000).toFixed(1)}L`;
    } else if (min) {
      return `${symbol}${(min / 100000).toFixed(1)}L+`;
    }
    return 'Not disclosed';
  };

  const getCompanyLogo = (company) => {
    // Generate a color based on company name
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
    const index = company.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your <span className="text-blue-600">Dream Job</span>
          </h1>
          <p className="text-gray-600 mb-6">
            Discover jobs that match your skills and interests from India's top companies.
          </p>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mt-4 items-center">
            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="All India"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Salary Filter */}
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="number"
                placeholder="Min ₹"
                value={filters.minSalary}
                onChange={(e) => setFilters({ ...filters, minSalary: e.target.value })}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-28 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="number"
                placeholder="Max ₹"
                value={filters.maxSalary}
                onChange={(e) => setFilters({ ...filters, maxSalary: e.target.value })}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-28 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Experience Filter */}
            <select
              value={filters.experience}
              onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Experience</option>
              <option value="0-1">0-1 Years</option>
              <option value="0-3">0-3 Years</option>
              <option value="3-5">3-5 Years</option>
              <option value="5+">5+ Years</option>
            </select>

            {/* Type Filter */}
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>

            {/* Skills Filter */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add skill..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSkillFilter()}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />
              <Button size="sm" onClick={addSkillFilter}>Add</Button>
            </div>

            {/* Active Skill Tags */}
            {filters.skills.map((skill) => (
              <Badge key={skill} variant="primary" className="flex items-center gap-1">
                {skill}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => removeSkillFilter(skill)}
                />
              </Badge>
            ))}

            {/* Clear Filters */}
            {(searchQuery || filters.location || filters.experience || filters.skills.length > 0 || filters.minSalary || filters.maxSalary || filters.type) && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Controls Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Active Filters Summary */}
            <div className="flex flex-wrap items-center gap-2">
              {searchQuery && (
                <Badge variant="info" className="flex items-center gap-1">
                  {searchQuery}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                </Badge>
              )}
              {filters.location && (
                <Badge variant="info" className="flex items-center gap-1">
                  {filters.location}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, location: '' })} />
                </Badge>
              )}
              {filters.experience && (
                <Badge variant="info" className="flex items-center gap-1">
                  {filters.experience} Years
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, experience: '' })} />
                </Badge>
              )}
            </div>
            
            <span className="text-sm text-gray-600 font-medium">
              {jobs.length} jobs found
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevant">Relevant</option>
                <option value="newest">Newest</option>
                <option value="salary">Salary</option>
              </select>
            </div>

            {/* Email Alerts Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Enable Email Alerts</span>
              <button
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  emailAlerts ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    emailAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Jobs List */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader size="lg" />
              </div>
            ) : jobs.length === 0 ? (
              <Card className="p-12 text-center">
                <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your filters or search query</p>
              </Card>
            ) : (
              jobs.map((job) => {
                const match = getMatchBadge(job);
                const isSaved = savedJobs.has(job._id);

                return (
                  <Card key={job._id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Company Logo */}
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: getCompanyLogo(job.company) }}
                        >
                          {job.company.charAt(0).toUpperCase()}
                        </div>

                        {/* Job Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {job.company}
                              </h3>
                              <p className="text-gray-700 font-medium">{job.title}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              <span>{formatSalary(job.salary)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              <span className="capitalize">{job.type}</span>
                            </div>
                          </div>

                          {/* Skills */}
                          {((job.requiredSkills && job.requiredSkills.length > 0) || (job.skills && job.skills.length > 0)) && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {(job.requiredSkills || job.skills).slice(0, 5).map((skill, idx) => (
                                <Badge key={idx} variant="secondary" size="sm">
                                  {skill}
                                </Badge>
                              ))}
                              {(job.requiredSkills || job.skills).length > 5 && (
                                <Badge variant="secondary" size="sm">
                                  +{(job.requiredSkills || job.skills).length - 5} more
                                </Badge>
                              )}
                            </div>
                          )}

                          <div className="flex items-center gap-3">
                            <Badge variant={match.variant}>
                              {match.icon} {match.label}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Posted {new Date(job.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          onClick={() => handleApply(job)}
                          className="flex items-center gap-2"
                        >
                          Apply Now
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={isSaved ? 'primary' : 'outline'}
                          onClick={() => handleSaveJob(job)}
                          className="flex items-center gap-2"
                        >
                          <Heart
                            className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`}
                          />
                          {isSaved ? 'Saved' : 'Save'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Apply Tips */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Apply Tips</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📄</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Optimize your resume</h4>
                    <p className="text-sm text-gray-600">Enable and customize with skills consistently.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✍️</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Tailor your cover letter</h4>
                    <p className="text-sm text-gray-600">Personalize your resume to match job requirements.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Apply early</h4>
                    <p className="text-sm text-gray-600">Set due dates to stay organized.</p>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4" variant="gradient">
                Resume Checker →
              </Button>
            </Card>

            {/* Saved Jobs Preview */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Saved Jobs</h3>
                <a href="/applications" className="text-sm text-blue-600 hover:text-blue-700">
                  View all →
                </a>
              </div>
              {savedJobs.size === 0 ? (
                <p className="text-sm text-gray-600 text-center py-4">
                  No saved jobs yet
                </p>
              ) : (
                <div className="space-y-3">
                  {Array.from(savedJobs).slice(0, 3).map((jobId) => {
                    const job = jobs.find(j => j._id === jobId);
                    if (!job) return null;

                    return (
                      <div key={jobId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: getCompanyLogo(job.company) }}
                        >
                          {job.company.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm truncate">
                            {job.title}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {formatSalary(job.salary)} • {job.location}
                          </p>
                        </div>
                        <Heart className="w-4 h-4 text-red-500 fill-current flex-shrink-0" />
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearchPage;
