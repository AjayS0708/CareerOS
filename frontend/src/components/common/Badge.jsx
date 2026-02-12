import React from 'react';

const variants = {
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  success: 'bg-green-50 text-green-700 border-green-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  error: 'bg-red-50 text-red-700 border-red-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  primary: 'bg-primary-50 text-primary-700 border-primary-200',
  accent: 'bg-accent-50 text-accent-700 border-accent-200',
  applied: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  interview: 'bg-purple-50 text-purple-700 border-purple-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
  shortlisted: 'bg-teal-50 text-teal-700 border-teal-200',
  declined: 'bg-gray-50 text-gray-700 border-gray-200',
};

const sizes = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
};

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  dot = false,
  icon: Icon,
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-lg border';
  
  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      )}
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
};

export default Badge;
