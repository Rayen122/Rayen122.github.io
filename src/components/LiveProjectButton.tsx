import { ArrowUpRight } from 'lucide-react'

type LiveProjectButtonProps = {
  href?: string
  label?: string
}

export default function LiveProjectButton({ href, label = 'Voir le site' }: LiveProjectButtonProps) {
  const classes =
    'inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 sm:px-10 sm:py-3.5 sm:text-base'

  if (!href) {
    return (
      <span className={`${classes} cursor-default opacity-40`} aria-disabled="true">
        {label}
      </span>
    )
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={`${classes} hover:bg-[#D7E2EA]/10`}>
      {label}
      <ArrowUpRight size={16} strokeWidth={2.5} />
    </a>
  )
}
