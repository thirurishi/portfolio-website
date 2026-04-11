import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex h-12 w-full rounded-2xl border border-navy-800 bg-navy-950 px-4 text-sm text-slate-100 placeholder:text-slate-500 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-midnight-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950',
  {
    variants: {
      variant: {
        default: '',
        ghost: 'bg-navy-900/80 border-navy-700'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => {
    return <input ref={ref} className={cn(inputVariants({ variant }), className)} {...props} />;
  }
);
Input.displayName = 'Input';
