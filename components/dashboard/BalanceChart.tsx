'use client';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { balanceHistory } from '@/lib/data';
import { money } from '@/lib/utils';

export function BalanceChart() {
  return <div role="img" aria-label="Account balance increased over the past 30 days" className="h-24 w-full min-w-0"><ResponsiveContainer width="100%" height="100%" minWidth={0}><AreaChart data={balanceHistory} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}><defs><linearGradient id="balance-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8aada0" stopOpacity={0.22} /><stop offset="100%" stopColor="#8aada0" stopOpacity={0} /></linearGradient></defs><Tooltip formatter={(value) => money(Number(value))} labelFormatter={(day) => `Day ${day}`} /><Area type="monotone" dataKey="balance" stroke="#739b8b" strokeWidth={1.7} fill="url(#balance-fill)" isAnimationActive={false} /></AreaChart></ResponsiveContainer></div>;
}
