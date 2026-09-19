import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import FadeIn from './FadeIn'
import LiveProjectButton from './LiveProjectButton'
import { projects, sideProjects } from '../data/projects'
import type { Project } from '../data/projects'

const RADIUS = 'rounded-[32px] sm:rounded-[50px] md:rounded-[60px]'
const SHOT_RADIUS = 'rounded-xl sm:rounded-3xl'

/* The stack lives inside the viewport: every card sticks at --card-top and is nudged down by
   --stack-step per index, so the deepest card must be that much shorter to stay fully visible. */
const STACK_VARS =
  '[--card-gap:1rem] [--card-top:0.75rem] [--stack-step:9px] ' +
  'sm:[--card-gap:1.25rem] sm:[--card-top:1.5rem] sm:[--stack-step:14px] ' +
  'md:[--card-gap:1.5rem] md:[--card-top:3rem] md:[--stack-step:16px] ' +
  'lg:[--card-top:4rem] lg:[--stack-step:20px]'

function Card({
  project,
  index,
  total,
  progress,
}: {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  return (
    <div
      className="sticky top-[var(--card-top)] flex items-start justify-center"
      style={{ height: `calc(100svh - var(--card-top) - var(--stack-step) * ${total - 1} - var(--card-gap))` }}
    >
      <motion.article
        style={{ scale, top: `calc(var(--stack-step) * ${index})` }}
        className={`relative flex h-full w-full flex-col gap-3 overflow-hidden border-2 border-[#D7E2EA] bg-[#0C0C0C] p-3 sm:gap-6 sm:p-6 md:p-8 ${RADIUS}`}
      >
        <header className="flex shrink-0 flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
          <div className="flex items-start gap-3 md:gap-8">
            <span
              className="hero-heading shrink-0 font-black leading-none"
              style={{ fontSize: 'clamp(1.9rem, 7vw, 100px)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-0.5 pt-0.5 md:gap-2 md:pt-2">
              <span className="text-[0.6rem] font-light uppercase tracking-[0.18em] text-[#D7E2EA]/60 sm:text-xs sm:tracking-[0.2em]">
                {project.category} · {project.year}
              </span>
              <h3
                className="font-medium uppercase leading-none text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1rem, 2.6vw, 2.4rem)' }}
              >
                {project.name}
              </h3>
              <p className="line-clamp-2 max-w-3xl pt-1 text-[0.7rem] font-light leading-snug text-[#D7E2EA]/60 sm:line-clamp-3 sm:text-sm sm:leading-relaxed lg:line-clamp-none">
                {project.summary}
              </p>
              <ul className="hidden list-none flex-wrap gap-2 pt-2 sm:flex">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-[#D7E2EA]/25 px-3 py-1 text-[0.7rem] font-light uppercase tracking-widest text-[#D7E2EA]/70"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {project.href ? (
            <LiveProjectButton href={project.href} label={project.linkLabel ?? 'Voir le site'} />
          ) : (
            <span className="shrink-0 self-start rounded-full border border-[#D7E2EA]/25 px-3 py-1 text-[0.55rem] font-light uppercase tracking-[0.16em] text-[#D7E2EA]/45 sm:px-5 sm:py-2 sm:text-[0.65rem] sm:tracking-[0.2em]">
              Projet client · privé
            </span>
          )}
        </header>

        {project.layout === 'mobile' ? (
          /* Five or six phones abreast only stay readable on a wide screen, so below lg the row is a
             snap-scrolling strip — every screen full height, one swipe apart. */
          <div className="no-scrollbar -mx-1 flex min-h-0 flex-1 snap-x snap-mandatory items-center gap-3 overflow-x-auto px-1 sm:gap-4 md:gap-6 lg:mx-0 lg:justify-center lg:overflow-visible lg:px-0">
            {project.images.map((src) => (
              <img
                key={src}
                src={src}
                alt={`${project.name} — aperçu`}
                loading="lazy"
                decoding="async"
                /* flex-1 splits the row between the phones once they all fit — a fixed share
                   computed from the full count starved them at the narrow end. */
                className={`h-full min-h-0 w-auto max-w-none shrink-0 snap-center object-contain lg:w-full lg:min-w-0 lg:max-w-full lg:flex-1 lg:shrink ${SHOT_RADIUS}`}
              />
            ))}
          </div>
        ) : (
          <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-[40%_1fr] sm:gap-4">
            <div className="flex min-h-0 flex-col gap-2 sm:gap-4">
              <img
                src={project.images[0]}
                alt={`${project.name} — aperçu`}
                loading="lazy"
                decoding="async"
                className={`min-h-0 w-full flex-1 object-contain object-center sm:flex-[2] sm:object-cover sm:object-top ${SHOT_RADIUS}`}
              />
              <img
                src={project.images[1]}
                alt={`${project.name} — aperçu`}
                loading="lazy"
                decoding="async"
                className={`min-h-0 w-full flex-1 object-contain object-center sm:flex-[3] sm:object-cover sm:object-top ${SHOT_RADIUS}`}
              />
            </div>
            <img
              src={project.images[2]}
              alt={`${project.name} — aperçu`}
              loading="lazy"
              decoding="async"
              className={`hidden h-full min-h-0 w-full object-cover object-top sm:block ${SHOT_RADIUS}`}
            />
          </div>
        )}
      </motion.article>
    </div>
  )
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-3 pb-20 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-6 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
      style={{ overflowX: 'clip' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading mb-10 text-center font-black uppercase leading-none tracking-tight sm:mb-14"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projets
        </h2>
      </FadeIn>

      <div ref={containerRef} className={`mx-auto max-w-[1400px] ${STACK_VARS}`}>
        {projects.map((project, i) => (
          <Card key={project.id} project={project} index={i} total={projects.length} progress={scrollYProgress} />
        ))}
      </div>

      <div className="mx-auto mt-24 max-w-[1400px] sm:mt-32">
        <FadeIn delay={0} y={30}>
          <h3 className="mb-8 text-center text-sm font-light uppercase tracking-[0.3em] text-[#D7E2EA]/50 sm:mb-12">
            Autres réalisations
          </h3>
        </FadeIn>

        <ul className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sideProjects.map((item, i) => (
            <FadeIn
              as="li"
              key={item.name}
              delay={(i % 4) * 0.08}
              y={30}
              className="overflow-hidden rounded-3xl border border-[#D7E2EA]/15 bg-white/[0.02]"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={`${item.name} — aperçu`}
                  loading="lazy"
                  decoding="async"
                  className="h-40 w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0C0C0C]">
                  <span className="hero-heading text-5xl font-black">{item.name.slice(0, 2)}</span>
                </div>
              )}
              <div className="flex flex-col gap-1 p-4">
                <span className="text-base font-medium uppercase tracking-wide text-[#D7E2EA]">{item.name}</span>
                <span className="text-xs font-light leading-relaxed text-[#D7E2EA]/50">{item.meta}</span>
              </div>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  )
}
