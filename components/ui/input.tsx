import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex h-12 w-full border-0 border-b border-ink-600 bg-transparent px-0 text-[15px] text-paper-100 placeholder:text-paper-700 transition-colors focus-visible:border-safelight-500 focus-visible:outline-none',
  {
    variants: {
      variant: {
        default: '',
        ghost: ''
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
