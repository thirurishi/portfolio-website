'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 transform-gpu focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-midnight-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-975 disabled:pointer-events-none disabled:opacity-50 tracking-wide',
  {
    variants: {
      variant: {
        default:
          'bg-midnight-500 text-navy-975 font-bold border border-midnight-400 shadow-[0_0_28px_rgba(212,175,55,0.22)] hover:bg-midnight-400 hover:shadow-[0_0_44px_rgba(212,175,55,0.42)] hover:-translate-y-1 active:scale-[0.96]',
        secondary:
          'border border-midnight-400/60 bg-navy-950 text-midnight-400 shadow-[0_0_0_1px_rgba(212,175,55,0.08)] hover:border-midnight-400 hover:bg-navy-900 hover:text-midnight-300 hover:-translate-y-1 active:scale-[0.96]',
        ghost: 'text-midnight-400 ring-1 ring-midnight-400/50 bg-transparent hover:bg-navy-900 hover:text-midnight-300 hover:ring-midnight-400 hover:-translate-y-1 active:scale-[0.96]'
      },
      size: {
        default: 'h-12 px-8 gap-2',
        sm: 'h-10 px-6 gap-1.5',
        lg: 'h-14 px-12 gap-2'
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
  const classes = cn(
    buttonVariants({ variant, size }),
    'transition-all duration-500 ease-out hover:-translate-y-1.5 active:scale-[0.95] will-change-transform backdrop-blur-sm',
    className
  );

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

  return (
    <button className={classes} {...(props as any)} />
  );
}
