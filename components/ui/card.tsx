import * as React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'relative border border-ink-700/80 bg-ink-900/70 p-6 transition-colors duration-300 hover:border-paper-100/25',
        className
      )}
      {...props}
    />
  );
}
