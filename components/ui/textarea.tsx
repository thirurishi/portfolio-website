import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textareaVariants = cva(
  'min-h-[140px] w-full resize-y border-0 border-b border-ink-600 bg-transparent px-0 py-3 text-[15px] text-paper-100 placeholder:text-paper-700 transition-colors focus-visible:border-safelight-500 focus-visible:outline-none',
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

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return <textarea ref={ref} className={cn(textareaVariants({ variant }), className)} {...props} />;
  }
);
Textarea.displayName = 'Textarea';
