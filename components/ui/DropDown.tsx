'use client';

import { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  label: string;
  options: Option[];
  onSelect: (value: string) => void;
};

export default function Dropdown({ label, options, onSelect }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-between items-center px-3 py-1 text-[#f5f5f5] text-md bg-[#1f1f1f] border border-[#333] rounded-lg w-40 hover:bg-[#1a1a1a]"
      >
        {label}
        <FaChevronDown className="ml-2 text-sm" />
      </button>

      {open && (
        <ul className="absolute z-10 mt-2 w-40 bg-[#1f1f1f] border text-[#f5f5f5] border-[#333] rounded-lg shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onSelect(option.value);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-[#1f1f1f] cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
