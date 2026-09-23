import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
export const metadata: Metadata = { title: 'Strategies Studio — Strategising People. Strengthening Businesses.', description: 'Practical HR consulting for growing organisations. Strategy, talent acquisition, employee engagement, learning, compliance, and payroll — from planning to implementation.' };
export default function RootLayout({ children }: { children: ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
