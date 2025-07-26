import { statusOptions } from '@/config/variables';
import React from 'react';

interface StatusBadgeProps {
  status: string;
  onClick?: () => void;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, onClick }) => {
  const option = statusOptions.find((opt) => opt.value === status);

  return (
    <button
      onClick={onClick}
      className={`text-sm font-semibold px-2 py-0.5 rounded flex items-center gap-1
        ${
          option?.value === 'completed'
            ? 'bg-green-600 text-white'
            : option?.value === 'pending'
            ? 'bg-yellow-600 text-white'
            : option?.value === 'progressing'
            ? 'bg-blue-600 text-white'
            : option?.value === 'deliveried'
            ? 'bg-purple-600 text-white'
            : option?.value === 'cancelled'
            ? 'bg-gray-600 text-white'
            : 'bg-red-600 text-white'
        }`}
    >
      {option?.label || status}
      <svg
        className="w-3 h-3"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default StatusBadge;
