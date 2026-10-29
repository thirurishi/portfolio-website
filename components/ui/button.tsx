'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'group/btn relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.2em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-safelight-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-975 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-paper-100 text-ink-975 hover:bg-safelight-500 hover:text-paper-50',
        secondary: 'border border-paper-100/35 bg-ink-975/30 text-paper-100 backdrop-blur-sm hover:border-paper-100 hover:bg-paper-100/10',
        ghost: 'text-paper-200 underline decoration-paper-100/30 underline-offset-[6px] hover:text-paper-50 hover:decoration-safelight-500'
      },
      size: {
        default: 'h-11 px-6 gap-2',
        sm: 'h-10 px-5 gap-1.5',
        lg: 'h-12 px-8 gap-2'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export type ButtonProps =
  | (VariantProps<typeof buttonVariants> & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (VariantProps<typeof buttonVariants> & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

export function Button({ className, variant, size, href, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        {...(/^https?:\/\//.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(props as any)}
      />
    );
  }

  return <button className={classes} {...(props as any)} />;
}
