import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
export function BentoCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('overflow-hidden rounded-2xl border border-line bg-surface p-6 md:p-8', className)} {...props} />;
}
