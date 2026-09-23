import type { Status } from '@/components/ui/StatusPill';
export interface Transaction { id: string; date: string; description: string; detail: string; category: 'Revenue' | 'Software' | 'Payroll' | 'Transfer'; amount: number; status: Status; }
export const transactions: Transaction[] = [
  { id: '1', date: '2026-09-22', description: 'Stripe', detail: 'Payout ···· 4092', category: 'Revenue', amount: 12840, status: 'Completed' },
  { id: '2', date: '2026-09-22', description: 'Linear', detail: 'Team subscription', category: 'Software', amount: -128, status: 'Completed' },
  { id: '3', date: '2026-09-21', description: 'Figma', detail: 'Professional plan', category: 'Software', amount: -144, status: 'Completed' },
  { id: '4', date: '2026-09-21', description: 'September payroll', detail: '12 team members', category: 'Payroll', amount: -28400, status: 'Pending' },
  { id: '5', date: '2026-09-20', description: 'Acme Studio', detail: 'Invoice #1048', category: 'Revenue', amount: 8500, status: 'Completed' },
  { id: '6', date: '2026-09-19', description: 'AWS', detail: 'Cloud infrastructure', category: 'Software', amount: -642.8, status: 'Completed' },
  { id: '7', date: '2026-09-18', description: 'Operating account', detail: 'Internal transfer', category: 'Transfer', amount: -5000, status: 'Failed' },
];
export const balanceHistory = [31, 30, 34, 32, 39, 38, 40, 37, 44, 43, 48, 45, 47, 55, 54, 59, 56, 64, 61, 62, 67, 63, 70, 68, 76, 73, 79, 76, 84, 88].map((value, index) => ({ day: index + 1, balance: 90000 + value * 1800 }));
