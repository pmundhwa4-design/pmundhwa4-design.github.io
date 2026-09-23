import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'icon';
type Size = 'sm' | 'md' | 'lg';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant; size?: Size; }
const variants: Record<Variant, string> = {
  primary: 'border-black bg-black text-white hover:bg-gray-800',
  secondary: 'border-line bg-white text-ink hover:bg-gray-50',
  ghost: 'border-transparent bg-transparent text-ink hover:bg-gray-100',
  icon: 'border-line bg-white text-ink hover:bg-gray-50 aspect-square !px-0',
};
const sizes: Record<Size, string> = { sm: 'h-9 px-3 text-xs', md: 'h-11 px-5 text-sm', lg: 'h-12 px-6 text-sm' };
// Native button semantics preserve keyboard support and form behavior.
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ variant = 'primary', size = 'md', className, type = 'button', ...props }, ref) {
  return <button ref={ref} type={type} className={cn('inline-flex shrink-0 items-center justify-center gap-2 rounded-md border font-medium transition duration-150 active:scale-95 motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40', variants[variant], sizes[size], className)} {...props} />;
});
