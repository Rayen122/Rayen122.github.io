import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import FadeIn from './FadeIn'
import LiveProjectButton from './LiveProjectButton'
import { projects, sideProjects } from '../data/projects'
import type { Project } from '../data/projects'

const RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]'
const SHOT_RADIUS = 'rounded-2xl sm:rounded-3xl'

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
    <div className="sticky top-16 flex h-[86svh] items-start justify-center sm:top-20 md:top-28">
      <motion.article
        style={{ scale, top: `${index * 28}px` }}
        className={`relative flex h-full w-full flex-col gap-4 overflow-hidden border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:gap-6 sm:p-6 md:p-8 ${RADIUS}`}
      >
        <header className="flex shrink-0 flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4 md:gap-8">
            <span
              className="hero-heading shrink-0 font-black leading-none"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 100px)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-1 pt-1 md:gap-2 md:pt-2">
              <span className="text-[0.65rem] font-light uppercase tracking-[0.2em] text-[#D7E2EA]/60 sm:text-xs">
                {project.category} · {project.year}
              </span>
              <h3
                className="font-medium uppercase leading-none text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1.1rem, 2.6vw, 2.4rem)' }}
              >
                {project.name}
              </h3>
              <p className="line-clamp-3 max-w-3xl pt-1 text-xs font-light leading-relaxed text-[#D7E2EA]/60 sm:text-sm lg:line-clamp-none">
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
            <span className="shrink-0 self-start rounded-full border border-[#D7E2EA]/25 px-5 py-2 text-[0.65rem] font-light uppercase tracking-[0.2em] text-[#D7E2EA]/45">
              Projet client · privé
            </span>
          )}
        </header>

        {project.layout === 'mobile' ? (
          <div className="flex min-h-0 flex-1 items-center justify-center gap-3 sm:gap-4 md:gap-6">
            {project.images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${project.name} — aperçu`}
                loading="lazy"
                decoding="async"
                /* flex-1 splits the row between whichever phones are visible at this width —
                   a fixed share computed from the full count starved the lone phone on mobile. */
                className={`h-full min-h-0 w-full min-w-0 flex-1 object-contain ${
                  i === Math.floor(project.images.length / 2) ? '' : 'hidden sm:block'
                } ${SHOT_RADIUS}`}
              />
            ))}
          </div>
        ) : (
          <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-[40%_1fr] sm:gap-4">
            <div className="flex min-h-0 flex-col gap-3 sm:gap-4">
              <img
                src={project.images[0]}
                alt={`${project.name} — aperçu`}
                loading="lazy"
                decoding="async"
                className={`min-h-0 w-full flex-1 object-cover object-top sm:flex-[2] ${SHOT_RADIUS}`}
              />
              <img
                src={project.images[1]}
                alt={`${project.name} — aperçu`}
                loading="lazy"
                decoding="async"
                className={`min-h-0 w-full flex-1 object-cover object-top sm:flex-[3] ${SHOT_RADIUS}`}
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
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-4 pb-20 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-6 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
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

      <div ref={containerRef} className="mx-auto max-w-[1400px]">
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
