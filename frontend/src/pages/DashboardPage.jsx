import React, { useState, useEffect } from 'react';
import { Card, Badge, Button, Loader } from '../components/common';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  ArrowRight,
  Briefcase,
  Clock
} from 'lucide-react';
import { getStoredUser } from '../services/authService';
import { getApplicationStats, getRecentApplications } from '../services/applicationService';
import { getRecommendations } from '../services/jobService';

const DashboardPage = () => {
  const user = getStoredUser();
  const [stats, setStats] = useState(null);
  const [recentApplications, setRecentApplications] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, applicationsData, jobsData] = await Promise.all([
          getApplicationStats(),
          getRecentApplications(5),
          getRecommendations(5),
        ]);

        if (statsData.success) {
          setStats(statsData.data);
        }
        if (applicationsData.success) {
          setRecentApplications(applicationsData.data.applications);
        }
        if (jobsData.success) {
          setRecommendations(jobsData.data.jobs);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate stats from data
  const totalApplications = stats?.total || 0;
  const shortlisted = stats?.byStatus?.find(s => s._id === 'shortlisted')?.count || 0;
  const interviews = stats?.upcomingInterviews || 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">
            Welcome back, <span className="text-primary">{user?.name?.split(' ')[0] || 'there'}!</span>
          </h1>
          <p className="text-text-light">
            Track, optimize, and get hired with CareerOS.
          </p>
        </div>

        {/* ATS Score Card - Top Right */}
        <Card 
          variant="gradient" 
          className="lg:w-80 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-blue-100 text-sm mb-1">Your ATS Score</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">--</span>
                  <span className="text-2xl text-blue-100">/100</span>
                </div>
              </div>
              <div className="w-20 h-20 rounded-full border-4 border-white border-opacity-30 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold">--</p>
                </div>
              </div>
            </div>
            <button className="text-sm text-blue-100 hover:text-white transition-colors flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Upload Resume to Calculate
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Applications */}
        <Card className="relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-text-light text-sm mb-1">Total Applications</p>
              <h3 className="text-4xl font-bold text-text">{totalApplications}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-text-light">
              {stats?.thisMonth || 0} this month
            </span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-50 rounded-full opacity-50"></div>
        </Card>

        {/* Interviews Scheduled */}
        <Card className="relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-text-light text-sm mb-1">Upcoming Interviews</p>
              <h3 className="text-4xl font-bold text-text">{interviews}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-text-light">scheduled</span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-purple-50 rounded-full opacity-50"></div>
        </Card>

        {/* Total Shortlisted */}
        <Card className="relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-text-light text-sm mb-1">Total Shortlisted</p>
              <h3 className="text-4xl font-bold text-text">{shortlisted}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
              <Target className="w-6 h-6 text-teal-600" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="success" size="sm" dot>
              Active
            </Badge>
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-teal-50 rounded-full opacity-50"></div>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text">Recent Applications</h2>
              <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                View all
              </Button>
            </div>

            {recentApplications.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-text-light mb-4">No applications yet</p>
                <Button variant="primary" size="sm">
                  Browse Jobs
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app._id} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                        {(app.jobSnapshot?.company || app.job?.company || 'C').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-text">{app.jobSnapshot?.company || app.job?.company}</h4>
                        <p className="text-sm text-text-light">{app.jobSnapshot?.title || app.job?.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-2 text-sm text-text-light">
                        <Clock className="w-4 h-4" />
                        {new Date(app.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <Badge 
                        variant={
                          app.status === 'applied' ? 'applied' :
                          app.status === 'interview-scheduled' ? 'interview' :
                          app.status === 'shortlisted' ? 'shortlisted' :
                          app.status === 'rejected' ? 'rejected' :
                          app.status === 'withdrawn' ? 'declined' :
                          'default'
                        }
                      >
                        {app.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Job Recommendations - Takes 1 column */}
        <div>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text">Recommended Jobs</h2>
              <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                View all
              </Button>
            </div>

            {recommendations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-text-light text-sm">No recommendations yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recommendations.map((job) => (
                  <div key={job._id} className="p-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {job.company.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-text mb-1 truncate">{job.title}</h4>
                        <p className="text-sm text-text-light mb-2">{job.company}</p>
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <Badge variant="primary" size="sm">
                            {job.locationType}
                          </Badge>
                          <span className="text-text-light">{job.location}</span>
                        </div>
                        {job.salary?.min && (
                          <p className="text-sm font-medium text-primary mt-2">
                            ${(job.salary.min / 1000).toFixed(0)}k - ${(job.salary.max / 1000).toFixed(0)}k
                          </p>
                        )}
                        <p className="text-xs text-text-light mt-1">
                          {new Date(job.postedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
                  