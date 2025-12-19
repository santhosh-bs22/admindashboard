import React from 'react';

interface ProgressCircleProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  subtitle?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value,
  size = 120,
  strokeWidth = 10,
  label,
  subtitle
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const getColor = (val: number) => {
    if (val >= 75) return '#10b981';
    if (val >= 50) return '#3b82f6';
    if (val >= 25) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
            className="dark:stroke-gray-700"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getColor(value)}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{value}%</span>
        </div>
      </div>
      {label && (
        <div className="mt-4 text-center">
          <p className="font-semibold">{label}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressCircle;