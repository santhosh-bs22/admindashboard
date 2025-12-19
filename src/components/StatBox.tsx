import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface StatBoxProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatBox: React.FC<StatBoxProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className
}) => {
  return (
    <div className={cn(
      "bg-card rounded-xl border p-6 shadow-sm transition-all hover:shadow-md",
      className
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-sm text-muted-foreground">{subtitle}</p>
            {trend && (
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                trend.isPositive
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
              )}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
        </div>
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default StatBox;