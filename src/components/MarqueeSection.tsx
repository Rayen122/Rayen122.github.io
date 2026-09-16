import { useEffect, useRef, useState } from 'react'

const SHOTS = [
  'rais-store-1', 'farhty-1', 'calyrox-1', 'isp-1', 'hydro-1', 'palvina-1', 'zouza-1',
  'mayastyle-1', 'sashastyle-1', 'parfum-1', 'autocar-1', 'resto-1', 'rodayne-1',
  'jiji-1', 'rais-store-2', 'farhty-2', 'calyrox-2', 'hydro-2', 'palvina-2',
  'zouza-2', 'isp-2', 'mayastyle-2', 'sashastyle-2', 'parfum-2', 'autocar-2', 'resto-2',
  'rodayne-2', 'rais-store-3', 'farhty-3', 'calyrox-3', 'hydro-3', 'palvina-3',
  'zouza-3', 'isp-3', 'mayastyle-3', 'sashastyle-3', 'parfum-3', 'autocar-3', 'resto-3',
].map((n) => `/shots/${n}.webp`)

const ROW_ONE = SHOTS.slice(0, 20)
const ROW_TWO = SHOTS.slice(20)

function Row({ items, direction, offset }: { items: string[]; direction: 1 | -1; offset: number }) {
  const tripled = [...items, ...items, ...items]

  return (
    <div
      className="flex gap-3"
      style={{ transform: `translateX(${direction * (offset - 200)}px)`, willChange: 'transform' }}
    >
      {tripled.map((src, i) => (
        <img
          key={`${src}-${i}`}
          src={src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover object-top"
        />
      ))}
    </div>
  )
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const sectionTop = el.getBoundingClientRect().top + window.scrollY
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-hidden="true"
      className="flex flex-col gap-3 bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
      style={{ overflowX: 'clip' }}
    >
      <Row items={ROW_ONE} direction={1} offset={offset} />
      <Row items={ROW_TWO} direction={-1} offset={offset} />
    </section>
  )
}
