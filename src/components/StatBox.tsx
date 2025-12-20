import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { Card, CardContent } from './ui/card';

interface StatBoxProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconColor?: string;
}

const StatBox: React.FC<StatBoxProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  iconColor = "text-primary"
}) => {
  return (
    <Card className={cn("hover:shadow-lg transition-all duration-200", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
              {title}
            </p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
            </div>
            {(subtitle || trend) && (
              <div className="flex items-center text-xs pt-1">
                {trend && (
                  <span className={cn(
                    "flex items-center font-medium mr-2",
                    trend.isPositive 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-red-600 dark:text-red-400"
                  )}>
                    {trend.isPositive ? '+' : ''}{trend.value}%
                  </span>
                )}
                {subtitle && <span className="text-muted-foreground truncate">{subtitle}</span>}
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-full bg-primary/10 shrink-0", iconColor)}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatBox;