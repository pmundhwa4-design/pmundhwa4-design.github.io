import Link from 'next/link';
export function Brand({ compact = false }: { compact?: boolean }) {
  return <Link href="/" aria-label="Strategies Studio home" className="inline-flex shrink-0 items-center gap-2.5">
    {/* Crop the supplied artwork in layout, retaining only the knight and its base. */}
    <span aria-hidden="true" className="relative block h-[44px] w-[29px] shrink-0 overflow-hidden mix-blend-multiply">
      <img src="/strategies-logo.png" alt="" width={750} height={750} className="absolute -left-[19px] -top-[1px] h-auto w-[65px] max-w-none" />
    </span>
    {!compact && <span className="text-[19px] font-medium leading-[0.95] tracking-[-0.045em]">strategies<span className="mt-1 block text-[17px] font-normal tracking-[-0.035em] text-[#748371]">studio</span></span>}
  </Link>;
}
