import React from 'react';

const Input = React.forwardRef(({ 
  label,
  error,
  helperText,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = true,
  className = '',
  containerClassName = '',
  ...props 
}, ref) => {
  const baseStyles = 'rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-text placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200';
  
  const errorStyles = error ? 'border-red-300 focus:ring-red-500' : '';
  const iconPaddingLeft = Icon && iconPosition === 'left' ? 'pl-11' : '';
  const iconPaddingRight = Icon && iconPosition === 'right' ? 'pr-11' : '';
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-text mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          ref={ref}
          className={`${baseStyles} ${errorStyles} ${iconPaddingLeft} ${iconPaddingRight} ${widthClass} ${className}`}
          {...props}
        />
        {Icon && iconPosition === 'right' && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-text-light">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
