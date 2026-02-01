import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          // Variants
          variant === 'default' && 
            'bg-gradient-to-r from-[#FF6B9D] to-[#C44FFF] text-white hover:opacity-90 shadow-lg hover:shadow-xl',
          variant === 'outline' && 
            'border-2 border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/30',
          variant === 'ghost' && 
            'bg-transparent text-gray-400 hover:bg-white/10 hover:text-white',
          variant === 'link' && 
            'bg-transparent text-[#C44FFF] underline-offset-4 hover:underline',
          // Sizes
          size === 'default' && 'h-11 px-6 py-2',
          size === 'sm' && 'h-9 px-4 text-sm',
          size === 'lg' && 'h-14 px-8 text-lg',
          size === 'icon' && 'h-11 w-11',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
