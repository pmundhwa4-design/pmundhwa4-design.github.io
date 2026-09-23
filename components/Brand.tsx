import Link from 'next/link';

export function Brand({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return <Link href="/" aria-label="Strategies Studio home" className="inline-flex shrink-0 items-center gap-2.5">
    <span aria-hidden="true" className="relative block h-[44px] w-[29px] shrink-0 overflow-hidden">
      <img src="/strategies-logo.png" alt="" width={750} height={750} className="absolute -left-[19px] -top-[1px] h-auto w-[65px] max-w-none" />
    </span>
    {!compact && <span aria-hidden="true" className={`block w-[84px] text-[19px] font-medium leading-[1.1] tracking-[-0.045em] ${light ? 'text-gray-900' : 'text-[#f5f3ee]'}`}>
      <span className="block h-[21px]">strategies</span>
      <span className={`mt-0.5 block h-[19px] text-[17px] font-normal tracking-[-0.035em] ${light ? 'text-gray-600' : 'text-[#c7bdab]'}`}>studio</span>
    </span>}
  </Link>;
}


