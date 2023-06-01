import React, { useState } from 'react';

interface SelectProps {
  options: Record<string, string>,
  value: string,
  onChange: (value: string) => void,
  className?: string,
}

export default function Select({ options, value, onChange, className }: SelectProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={`select ${className || ''}`}>
      <button
        className={open ? 'open' : ''}
        onClick={() => setOpen(!open)}
        onBlur={() => {
          setTimeout(() => setOpen(false), 300);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setOpen(false);
          }
        }}
      >
        {options[value]}
      </button>
      <ul className={open ? 'show' : 'hide'}>
        {Object.entries(options).map(([key, v]) => (
          <li
            key={key}
            className={value === key ? 'selected' : ''}
            onClick={() => onChange(key)}
          >
            {v}
          </li>
        ))}
      </ul>
    </div>
  );
}
