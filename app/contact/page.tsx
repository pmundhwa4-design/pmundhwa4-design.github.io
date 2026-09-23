import type { Metadata } from 'next';
import { ContactPage } from '@/components/marketing/ContactPage';

export const metadata: Metadata = { title: 'Start a conversation — Strategies Studio', description: 'Tell Strategies Studio about your organisation and HR priorities.' };
export default function Page() { return <ContactPage />; }
