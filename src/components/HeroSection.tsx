import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import FadeIn from './FadeIn'
import ContactButton from './ContactButton'

const NAV = [
  { label: 'À propos', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projets', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

/** Full-screen nav for phones — the inline links only fit from `md` up. */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col bg-[#0C0C0C] md:hidden"
        >
          <div className="flex items-center justify-between px-6 pt-6">
            <img src="/brand/icon-192.png" alt="borgi.dev" width={40} height={40} className="h-9 w-9" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer le menu"
              className="-mr-2 flex h-12 w-12 items-center justify-center rounded-full text-[#D7E2EA] transition-opacity duration-200 active:opacity-60"
            >
              <X size={26} strokeWidth={2} />
            </button>
          </div>

          <ul className="flex flex-1 list-none flex-col justify-center gap-2 px-6 pb-16">
            {NAV.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + i * 0.06, duration: 0.35 }}
              >
                <a
                  href={item.href}
                  onClick={onClose}
                  className="flex min-h-[64px] items-center border-b border-[#D7E2EA]/10 text-3xl font-medium uppercase tracking-wide text-[#D7E2EA] transition-opacity duration-200 active:opacity-60"
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section id="top" className="relative flex h-[100svh] min-h-[480px] flex-col" style={{ overflowX: 'clip' }}>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.picture
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <source srcSet="/brand/hero-logo.webp" type="image/webp" />
          <img
            src="/brand/hero-logo.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-[center_38%] grayscale-[25%] contrast-105"
          />
        </motion.picture>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-[#0c0c0c]/35 to-[#0c0c0c]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#0c0c0c_88%)]" />
        <div className="absolute inset-0 bg-[#9C4FE2] mix-blend-overlay opacity-[0.12]" />
      </div>

      <FadeIn as="nav" delay={0} y={-20} className="relative z-10 px-5 pt-5 sm:px-6 sm:pt-6 md:px-10 md:pt-8">
        <div className="flex items-center justify-between gap-4">
          <a
            href="#top"
            aria-label="borgi.dev — accueil"
            className="block shrink-0 transition-opacity duration-200 hover:opacity-80"
          >
            <img
              src="/brand/icon-192.png"
              alt="borgi.dev"
              width={40}
              height={40}
              className="h-9 w-9 max-w-none md:h-11 md:w-11"
            />
          </a>

          <ul className="hidden list-none items-center md:flex">
            {NAV.map((item) => (
              <li key={item.href} className="ml-8">
                <a
                  href={item.href}
                  className="text-lg font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 lg:text-[1.4rem]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="-mr-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[#D7E2EA] transition-opacity duration-200 active:opacity-60 md:hidden"
          >
            <Menu size={26} strokeWidth={2} />
          </button>
        </div>
      </FadeIn>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="relative z-10 overflow-hidden px-4 md:px-6">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[13.5vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[14.5vw] md:-mt-5 md:text-[15.5vw] lg:text-[16.2vw]">
            Hi, i&apos;m rayen
          </h1>
        </FadeIn>
      </div>

      <div className="relative z-10 mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-5 px-5 pb-7 sm:px-6 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20} className="min-w-0 flex-1">
          <p
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            développeur full-stack en Tunisie — je construis des sites et des applications qui vendent vraiment
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="shrink-0">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}
