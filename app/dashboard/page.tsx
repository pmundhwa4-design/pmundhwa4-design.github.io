import { redirect } from 'next/navigation';
// Retire the finance demo URL from the consulting website.
export default function DashboardPage() { redirect('/#services'); }
