import React from 'react';

const variants = {
  default: 'bg-white border border-gray-200',
  gradient: 'gradient-primary text-white border-0',
  outlined: 'bg-white border-2 border-gray-200',
  hover: 'bg-white border border-gray-200 card-hover cursor-pointer',
};

const Card = ({ 
  children, 
  variant = 'default',
  className = '',
  padding = true,
  ...props 
}) => {
  const baseStyles = 'rounded-xl shadow-card';
  const paddingClass = padding ? 'p-6' : '';
  
  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${paddingClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
