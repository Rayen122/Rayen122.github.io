import { motion } from 'framer-motion'
import FadeIn from './FadeIn'
import ContactButton from './ContactButton'

const NAV = [
  { label: 'À propos', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projets', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function HeroSection() {
  return (
    <section className="relative flex h-screen flex-col" style={{ overflowX: 'clip' }}>
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

      <FadeIn as="nav" delay={0} y={-20} className="relative z-10 px-6 pt-6 md:px-10 md:pt-8">
        <ul className="flex list-none items-center justify-between">
          <li className="mr-auto">
            <a href="#top" aria-label="borgi.dev — accueil" className="block transition-opacity duration-200 hover:opacity-80">
              <img
                src="/brand/icon-192.png"
                alt="borgi.dev"
                width={40}
                height={40}
                className="h-9 w-9 md:h-11 md:w-11"
              />
            </a>
          </li>
          {NAV.map((item) => (
            <li key={item.href} className="ml-5 md:ml-8">
              <a
                href={item.href}
                className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

      <div className="relative z-10 overflow-hidden px-4 md:px-6">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[13.5vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[14.5vw] md:-mt-5 md:text-[15.5vw] lg:text-[16.2vw]">
            Hi, i&apos;m rayen
          </h1>
        </FadeIn>
      </div>

      <div className="relative z-10 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            développeur full-stack en Tunisie — je construis des sites et des applications qui vendent vraiment
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}
