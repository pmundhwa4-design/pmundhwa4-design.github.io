import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = { title: 'Strategies Studio — Strategising People. Strengthening Businesses.', description: 'Practical HR consulting for growing organisations. Explore strategy, recruitment, engagement, learning, compliance, payroll, and a partnership built around your people.' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" className="scroll-smooth motion-reduce:scroll-auto"><body className="bg-canvas font-sans text-ink antialiased selection:bg-emerald-100">{children}</body></html>;
}
