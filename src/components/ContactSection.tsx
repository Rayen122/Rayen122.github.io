import { Mail, MapPin } from 'lucide-react'
import FadeIn from './FadeIn'
import ContactButton from './ContactButton'

/** lucide dropped brand marks in v1, so the GitHub logo lives here. */
function GithubMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2.12c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

const LINKS = [
  { icon: Mail, label: 'rayenborgi654@gmail.com', href: 'mailto:rayenborgi654@gmail.com' },
  { icon: GithubMark, label: 'github.com/Rayen122', href: 'https://github.com/Rayen122' },
  { icon: MapPin, label: 'Tunis, Tunisie', href: undefined },
]

export default function ContactSection() {
  return (
    <footer
      id="contact"
      className="relative z-10 flex flex-col items-center gap-12 bg-[#0C0C0C] px-5 pb-12 pt-24 sm:px-8 sm:pt-32 md:px-10 md:pt-40"
      style={{ overflowX: 'clip' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Parlons-en
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={20}>
        <p
          className="max-w-[560px] text-center font-light leading-relaxed text-[#D7E2EA]/70"
          style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)' }}
        >
          Un site à refaire, une boutique à lancer, une idée à cadrer ? Écrivez-moi ce que vous avez en tête — je
          réponds avec un plan, un délai et un prix.
        </p>
      </FadeIn>

      <FadeIn delay={0.3} y={20}>
        <ContactButton label="Écrire un message" />
      </FadeIn>

      <FadeIn delay={0.4} y={20} className="w-full max-w-3xl">
        <ul className="flex list-none flex-col items-center justify-center gap-4 border-t border-[#D7E2EA]/15 pt-8 sm:flex-row sm:gap-10">
          {LINKS.map(({ icon: Icon, label, href }) => {
            const content = (
              <span className="flex items-center gap-2 text-sm font-light text-[#D7E2EA]/60 transition-colors duration-200 hover:text-[#D7E2EA]">
                <Icon size={16} />
                {label}
              </span>
            )
            return (
              <li key={label}>
                {href ? (
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            )
          })}
        </ul>
      </FadeIn>

      <p className="text-xs font-light uppercase tracking-[0.25em] text-[#D7E2EA]/30">
        © {new Date().getFullYear()} Rayen Borgi
      </p>
    </footer>
  )
}
