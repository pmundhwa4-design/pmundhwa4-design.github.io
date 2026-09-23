'use client';
import { useEffect } from 'react';
import Link from 'next/link';
// A client redirect also works on static hosting without a Next.js server.
export default function DashboardPage() {
  useEffect(() => { window.location.replace('/#services'); }, []);
  return <p className="p-8 text-sm">This page has moved. <Link href="/#services" className="underline">Explore our services.</Link></p>;
}
