import React from 'react';

const variants = {
  primary: 'bg-primary hover:bg-primary-700 text-white shadow-md hover:shadow-lg',
  accent: 'bg-accent hover:bg-accent-700 text-white shadow-md hover:shadow-lg',
  outline: 'border-2 border-gray-300 hover:border-primary hover:text-primary bg-white',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-text',
  ghost: 'hover:bg-gray-100 text-text',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-md',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  icon: 'p-2',
};

const Button = React.forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  disabled = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md';
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
