import React from 'react';
import { cn } from '../lib/utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  action?: React.ReactNode; // Added to support buttons/actions
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, className, action }) => {
  return (
    <div className={cn(
      "flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8", 
      className
    )}>
      {/* Title Section */}
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>

      {/* Action/Button Section */}
      {action && (
        <div className="flex items-center gap-2">
          {action}
        </div>
      )}
    </div>
  );
};

export default Header;