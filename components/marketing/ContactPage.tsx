'use client';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowUpRight, Mail, Phone, Check, Copy } from 'lucide-react';
import { Brand } from '@/components/Brand';
import { Button } from '@/components/ui/Button';
import { BentoCard } from '@/components/ui/BentoCard';

const email = 'ankita.vania@strategiestudio.com';
const services = ['HR Strategy & Advisory', 'Talent Acquisition', 'Employee Engagement', 'Training & Development', 'Compliance & Risk', 'Payroll & Benefits', 'I’m not sure yet'];
const field = 'mt-2 w-full rounded-lg border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200';

export function ContactPage() {
  const [draft, setDraft] = useState<{ body: string; url: string } | null>(null);
  const [notice, setNotice] = useState('');
  // Email handoff avoids claiming delivery without a configured submission backend.
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Hello Strategies Studio,\n\n${String(data.get('message')).trim()}\n\nName: ${String(data.get('name')).trim()}\nWork email: ${data.get('email')}\nOrganisation: ${String(data.get('company')).trim() || 'Not provided'}\nPhone: ${String(data.get('phone')).trim() || 'Not provided'}\nInterested in: ${data.get('service')}`;
    setDraft({ body, url: `mailto:${email}?subject=${encodeURIComponent('HR consultation inquiry — ' + data.get('service'))}&body=${encodeURIComponent(body)}` });
    setNotice('Your inquiry is ready. Open your email app to review and send it.');
  }
  async function copy() {
    if (!draft) return;
    try { await navigator.clipboard.writeText(draft.body); setNotice('Inquiry copied. Paste it into an email to ' + email + '.'); }
    catch { setNotice('Copy is unavailable. Select and copy the inquiry text below.'); }
  }
  return <div className="min-h-screen">
    <header className="border-b border-line bg-white/80"><nav aria-label="Contact navigation" className="mx-auto flex h-24 max-w-[1200px] items-center justify-between gap-5 px-6"><Brand /><Link href="/" className="inline-flex items-center gap-2 text-xs text-muted hover:text-ink"><ArrowLeft size={14} />Back to home</Link></nav></header>
    <main className="mx-auto grid max-w-[1160px] gap-12 px-6 py-14 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:py-20">
      <div><p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#748371]">A conversation is a good beginning</p><h1 className="mt-6 text-5xl font-medium leading-[1.08] tracking-heading md:text-6xl">Your next chapter.<br /><span className="text-[#748371]">Let’s talk about it.</span></h1><p className="mt-6 max-w-sm text-sm leading-7 text-muted">Bring us a people challenge, a business ambition, or a question. We’ll start by understanding what matters to you.</p><div className="mt-10 space-y-5"><a href={`mailto:${email}`} className="flex items-center gap-3 text-sm"><span className="rounded-full border border-line bg-white p-3"><Mail size={16} strokeWidth={1.5} /></span><span className="break-all">{email}</span></a><a href="tel:+919106766028" className="flex items-center gap-3 text-sm"><span className="rounded-full border border-line bg-white p-3"><Phone size={16} strokeWidth={1.5} /></span>+91 91067 66028</a></div><div className="mt-12 border-t border-line pt-6"><p className="text-xs font-medium">A thoughtful first step.</p><p className="mt-3 max-w-sm text-xs leading-6 text-muted">Share a little about your organisation and the support you’re looking for. We can explore the right starting point together.</p></div></div>
      <BentoCard className="!p-6 sm:!p-8"><h2 className="text-xl font-medium tracking-tight">Tell us what’s on your mind.</h2><p className="mt-2 text-xs leading-6 text-muted">Fields marked * are required.</p>
        <form onSubmit={prepare} onChange={() => { if (draft) { setDraft(null); setNotice(''); } }} className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2"><label className="block text-xs font-medium">Your name *<input name="name" autoComplete="name" required maxLength={100} pattern=".*\S.*" placeholder="Full name" className={field} /></label><label className="block text-xs font-medium">Work email *<input name="email" type="email" autoComplete="email" required maxLength={160} placeholder="you@company.com" className={field} /></label></div>
          <div className="grid gap-5 sm:grid-cols-2"><label className="block text-xs font-medium">Organisation<input name="company" autoComplete="organization" maxLength={100} placeholder="Company name" className={field} /></label><label className="block text-xs font-medium">Phone <span className="font-normal text-muted">(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Include country code" className={field} /></label></div>
          <label className="block text-xs font-medium">How can we help? *<select name="service" required defaultValue="" className={field}><option value="" disabled>Select an area of interest</option>{services.map(service => <option key={service}>{service}</option>)}</select></label>
          <label className="block text-xs font-medium">Your message *<textarea name="message" required minLength={10} maxLength={2000} rows={5} placeholder="Tell us about your team, your priorities, or a challenge you’re working through…" className={`${field} resize-y`} /></label>
          <p className="text-[11px] leading-5 text-muted">This form prepares an email on your device. Nothing is submitted here; you’ll review and send the inquiry from your own email app.</p>
          <Button type="submit" className="w-full rounded-full">Prepare inquiry<ArrowUpRight size={15} /></Button>
        </form>
        <p role="status" aria-live="polite" className="mt-4 text-xs leading-6 text-[#526b50]">{notice}</p>
        {draft && <div className="mt-4 rounded-xl border border-line bg-gray-50 p-4"><div className="flex items-center gap-2 text-sm font-medium"><Check size={16} />Ready for your review</div><textarea aria-label="Prepared inquiry" readOnly value={draft.body} rows={6} className={`${field} text-xs leading-6`} /><div className="mt-4 flex flex-wrap gap-3"><a href={draft.url} className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-xs text-white">Open email app<ArrowUpRight size={13} /></a><Button variant="secondary" size="sm" onClick={copy} className="rounded-full"><Copy size={13} />Copy inquiry</Button></div><p className="mt-3 text-[11px] leading-5 text-muted">No email app configured? Copy the inquiry and email it to {email}.</p></div>}
      </BentoCard>
    </main><footer className="mx-auto flex max-w-[1112px] flex-wrap justify-between gap-4 border-t border-line px-6 py-6 text-[10px] text-muted"><span>© {new Date().getFullYear()} Strategies Studio</span><Link href="/#services">Explore our services ↗</Link></footer>
  </div>;
}
