import FadeIn from './FadeIn'
import AnimatedText from './AnimatedText'
import ContactButton from './ContactButton'

const ABOUT_TEXT =
  "Je développe des sites et des applications pour des marques tunisiennes qui vendent en ligne : boutiques, vitrines, back-offices et API. Front soigné, backend qui tient la charge, et une mise en ligne qui va jusqu'au bout — hébergement, SEO et suivi compris."

/** Soft 3D-looking orbs in the four corners — pure CSS, nothing to download. */
function Orb({ className, hue }: { className: string; hue: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-[1px] ${className}`}
      style={{
        background: `radial-gradient(circle at 34% 30%, rgba(255,255,255,0.14) 0%, ${hue} 38%, rgba(12,12,12,0) 74%)`,
        filter: 'blur(10px)',
        opacity: 0.7,
      }}
    />
  )
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-[100svh] items-center justify-center px-5 py-20 sm:px-8 md:px-10"
      style={{ overflowX: 'clip' }}
    >
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
        <Orb
          className="left-[1%] top-[4%] h-[120px] w-[120px] sm:left-[2%] sm:h-[160px] sm:w-[160px] md:left-[4%] md:h-[210px] md:w-[210px]"
          hue="rgba(120, 150, 185, 0.45)"
        />
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
        <Orb
          className="right-[1%] top-[4%] h-[120px] w-[120px] sm:right-[2%] sm:h-[160px] sm:w-[160px] md:right-[4%] md:h-[210px] md:w-[210px]"
          hue="rgba(118, 33, 177, 0.5)"
        />
      </FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
        <Orb
          className="bottom-[8%] left-[3%] h-[100px] w-[100px] sm:left-[6%] sm:h-[140px] sm:w-[140px] md:left-[10%] md:h-[180px] md:w-[180px]"
          hue="rgba(182, 0, 168, 0.42)"
        />
      </FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
        <Orb
          className="bottom-[8%] right-[3%] h-[130px] w-[130px] sm:right-[6%] sm:h-[170px] sm:w-[170px] md:right-[10%] md:h-[220px] md:w-[220px]"
          hue="rgba(190, 76, 0, 0.42)"
        />
      </FadeIn>

      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading text-center font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              À propos
            </h2>
          </FadeIn>

          <AnimatedText
            text={ABOUT_TEXT}
            className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        <FadeIn delay={0.1} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}
