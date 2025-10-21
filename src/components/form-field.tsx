import React from 'react';
import { Input } from '@/components/ui/input';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  inputMode?: 'text' | 'email' | 'tel' | 'numeric' | 'decimal' | 'search' | 'none';
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({
    label,
    name,
    type = 'text',
    placeholder = '',
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    inputMode,
  }, ref) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <Input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          inputMode={inputMode}
          className={`w-full bg-gray-50 border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-300 ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-300' : ''
          }`}
        />
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
