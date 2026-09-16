import FadeIn from './FadeIn'

const LOGOS = [
  { name: 'ISP Automation', src: '/logos/isp-automation.webp', bg: '#ffffff' },
  { name: 'Calyrox', src: '/logos/calyrox-logo.webp', bg: '#0b0d0f' },
]

export default function LogosSection() {
  return (
    <section className="flex flex-col items-center gap-8 px-5 pb-20 pt-4 sm:px-8 md:px-10">
      <FadeIn delay={0} y={20}>
        <p className="text-center text-xs font-medium uppercase tracking-[0.3em] text-[#8A97A3]">
          Logos que j&apos;ai conçus
        </p>
      </FadeIn>

      <div className="flex w-full max-w-3xl flex-col gap-5 sm:flex-row">
        {LOGOS.map((logo, i) => (
          <FadeIn key={logo.name} delay={0.1 + i * 0.1} y={20} className="flex-1">
            <div
              className="flex h-[140px] items-center justify-center rounded-2xl border border-white/10 px-8 sm:h-[160px]"
              style={{ backgroundColor: logo.bg }}
            >
              <img
                src={logo.src}
                alt={`Logo ${logo.name}`}
                className="max-h-[70px] w-auto max-w-full object-contain sm:max-h-[80px]"
              />
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
