import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  description,
  variant = 'default',
}) => {
  const variantStyles = {
    default: 'before:bg-primary',
    primary: 'before:bg-primary',
    success: 'before:bg-success',
    warning: 'before:bg-warning',
  };

  return (
    <div className={cn('stat-card animate-fade-in', variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          
          {trend && (
            <div className={cn(
              'flex items-center gap-1 text-sm font-medium',
              trend.isPositive ? 'text-success' : 'text-destructive'
            )}>
              {trend.isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{trend.value}%</span>
              <span className="text-muted-foreground font-normal">vs last week</span>
            </div>
          )}
          
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        
        <div className={cn(
          'p-3 rounded-xl',
          variant === 'success' && 'bg-success/10 text-success',
          variant === 'warning' && 'bg-warning/10 text-warning',
          (variant === 'default' || variant === 'primary') && 'bg-primary/10 text-primary'
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
