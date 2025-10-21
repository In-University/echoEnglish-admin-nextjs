import React, { useRef, useEffect } from 'react';
import { Input } from './input';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const OTPInput = React.forwardRef<HTMLInputElement, OTPInputProps>(
  ({
    value,
    onChange,
    length = 6,
    disabled = false,
    placeholder = '0'.repeat(length),
    className = '',
  }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(inputRef.current);
        } else {
          ref.current = inputRef.current;
        }
      }
    }, [ref]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value.replace(/\D/g, '').slice(0, length);
      onChange(inputValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow backspace, delete, arrow keys
      if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        return;
      }
      // Allow only numbers
      if (!/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData('text');
      const numbers = pastedText.replace(/\D/g, '').slice(0, length);
      onChange(numbers);
    };

    return (
      <Input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        maxLength={length}
        disabled={disabled}
        className={`text-center text-2xl tracking-widest font-mono bg-gray-50 border-2 border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-300 py-3 ${className}`}
      />
    );
  }
);

OTPInput.displayName = 'OTPInput';
