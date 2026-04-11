import * as React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'royal-card rounded-3xl border border-midnight-400/30 bg-navy-900 p-6 shadow-[0_0_0_1px_rgba(212,175,55,0.07),_0_32px_80px_rgba(7,5,15,0.88)] hover:shadow-[0_0_0_1px_rgba(212,175,55,0.30),_0_0_40px_rgba(212,175,55,0.06),_0_32px_80px_rgba(7,5,15,0.9)] hover:border-midnight-400/50 transition-all duration-300',
        className
      )}
      {...props}
    />
  );
}
