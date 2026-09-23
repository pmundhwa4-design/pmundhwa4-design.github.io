import { cn } from '@/lib/utils';
export type Status = 'Completed' | 'Pending' | 'Failed';
const styles: Record<Status, string> = { Completed: 'bg-mint text-emerald-800', Pending: 'bg-amber-50 text-amber-800', Failed: 'bg-rose-50 text-rose-800' };
export function StatusPill({ status }: { status: Status }) {
  return <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium', styles[status])}><span className="h-1 w-1 rounded-full bg-current" />{status}</span>;
}
