import React from 'react';
import { Card, Badge, Button } from '../components/common';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  ArrowRight,
  Briefcase,
  Clock
} from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">
            Welcome back, <span className="text-primary">Ankit!</span>
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
                <p className="text-blue-100 text-sm mb-1">Unlock Your ATS Score: 38</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">83</span>
                  <span className="text-2xl text-blue-100">/100</span>
                </div>
              </div>
              <div className="w-20 h-20 rounded-full border-4 border-white border-opacity-30 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold">83</p>
                </div>
              </div>
            </div>
            <button className="text-sm text-blue-100 hover:text-white transition-colors flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Learn More
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
              <h3 className="text-4xl font-bold text-text">142</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600 font-medium">+12%</span>
            <span className="text-text-light">from last month</span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-50 rounded-full opacity-50"></div>
        </Card>

        {/* Interviews Scheduled */}
        <Card className="relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-text-light text-sm mb-1">Interviews Scheduled</p>
              <h3 className="text-4xl font-bold text-text">9</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600 font-medium">+3</span>
            <span className="text-text-light">this week</span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-purple-50 rounded-full opacity-50"></div>
        </Card>

        {/* Total Shortlisted */}
        <Card className="relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-text-light text-sm mb-1">Total Shortlisted</p>
              <h3 className="text-4xl font-bold text-text">24</h3>
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

            <div className="space-y-4">
              {[
                { company: 'TCS', role: 'Software Engineer', status: 'applied', date: '29 Aug 2023', statusVariant: 'applied' },
                { company: 'Infosys', role: 'Full Stack Developer', status: 'interview', date: '29 Aug 2023', statusVariant: 'interview' },
                { company: 'FamPay', role: 'Backend Engineer', status: 'rejected', date: '29 Aug 2023', statusVariant: 'rejected' },
                { company: 'HDFC Bank', role: 'Flutter Engineer', status: 'shortlisted', date: '29 Aug 2023', statusVariant: 'shortlisted' },
                { company: 'Dream11', role: 'iOS intern', status: 'declined', date: '29 Aug 2023', statusVariant: 'declined' },
              ].map((app, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                      {app.company.substring(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-text">{app.company}</h4>
                      <p className="text-sm text-text-light">{app.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 text-sm text-text-light">
                      <Clock className="w-4 h-4" />
                      {app.date}
                    </div>
                    <Badge variant={app.statusVariant} dot>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Job Recommendations - Takes 1 column */}
        <div>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text">Job Recommendations</h2>
              <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                View all
              </Button>
            </div>

            <div className="space-y-4">
              {[
                { company: 'Backend Developer', location: 'Bengaluru', salary: '₹10L - ₹15L', time: '3h ago' },
                { company: 'Data Analyst', location: 'Bengaluru', salary: '₹9L - ₹12L', time: '4h ago' },
                { company: 'Frontend Developer', location: 'Mumbai', salary: '₹8\u2060L - ₹10K', time: '5h ago' },
              ].map((job, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                      {(idx + 1)}
                    </div>
                    <span className="text-xs text-text-light">{job.time}</span>
                  </div>
                  <h4 className="font-semibold text-text mb-1">{job.company}</h4>
                  <p className="text-sm text-text-light mb-3">{job.salary} · {job.location}</p>
                  <Button variant="primary" size="sm" fullWidth>
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
