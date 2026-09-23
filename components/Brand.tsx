import Link from 'next/link';
export function Brand({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return <Link href="/" aria-label="Strategies Studio home" className={`inline-flex shrink-0 items-center ${light ? '' : 'rounded bg-white p-2'}`}>
    <img src="/strategies-logo-landscape.png" alt="Strategies Studio — Designing the workforce of tomorrow" width={1800} height={600} className={`block h-auto ${compact ? 'w-[180px]' : 'w-[230px]'}`} />
  </Link>;
}
