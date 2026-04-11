import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textareaVariants = cva(
  'min-h-[140px] w-full rounded-2xl border border-navy-800 bg-navy-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-midnight-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950',
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

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return <textarea ref={ref} className={cn(textareaVariants({ variant }), className)} {...props} />;
  }
);
Textarea.displayName = 'Textarea';
