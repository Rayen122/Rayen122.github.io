import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export type LightboxState = { title: string; images: string[]; index: number }

const NAV_BUTTON =
  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D7E2EA]/30 bg-[#0C0C0C]/70 text-[#D7E2EA] backdrop-blur transition hover:border-[#D7E2EA] hover:bg-[#D7E2EA] hover:text-[#0C0C0C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9C4FE2] sm:h-14 sm:w-14'

/** Full-screen viewer: arrows, keyboard (← → Échap), swipe and a thumbnail strip. */
export default function Lightbox({
  state,
  onChange,
  onClose,
}: {
  state: LightboxState | null
  onChange: (index: number) => void
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)
  const touchX = useRef<number | null>(null)

  const count = state?.images.length ?? 0
  const index = state?.index ?? 0
  const go = (step: number) => count > 1 && onChange((index + step + count) % count)

  // Lock the page, move focus in, and hand it back to whatever opened the viewer.
  const open = state !== null
  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      opener?.focus({ preventScroll: true })
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // Keep the active thumbnail in view as the user steps through.
  useEffect(() => {
    thumbsRef.current
      ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [index, open])

  // Warm the neighbours so stepping feels instant.
  useEffect(() => {
    if (!state || count < 2) return
    for (const step of [1, -1]) new Image().src = state.images[(index + step + count) % count]
  }, [state, index, count])

  return createPortal(
    <AnimatePresence>
      {state && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${state.title} — captures d'écran`}
          className="fixed inset-0 z-[100] flex flex-col bg-[#0C0C0C]/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <header className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 sm:px-8 sm:py-5">
            <div className="flex min-w-0 items-baseline gap-3 text-[#D7E2EA]">
              <span className="truncate text-sm font-medium uppercase tracking-wide sm:text-lg">{state.title}</span>
              <span className="shrink-0 text-xs font-light tabular-nums text-[#D7E2EA]/60 sm:text-sm">
                {index + 1} / {count}
              </span>
            </div>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Fermer" className={NAV_BUTTON}>
              <X className="h-5 w-5" />
            </button>
          </header>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center gap-2 px-2 sm:gap-6 sm:px-8"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return
              const dx = e.changedTouches[0].clientX - touchX.current
              touchX.current = null
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
            }}
          >
            {count > 1 && (
              <button type="button" onClick={() => go(-1)} aria-label="Photo précédente" className={`${NAV_BUTTON} hidden sm:flex`}>
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={state.images[index]}
                src={state.images[index]}
                alt={`${state.title} — capture ${index + 1} sur ${count}`}
                className="max-h-full min-w-0 max-w-full rounded-xl object-contain shadow-2xl sm:rounded-2xl"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                draggable={false}
              />
            </AnimatePresence>
            {count > 1 && (
              <button type="button" onClick={() => go(1)} aria-label="Photo suivante" className={`${NAV_BUTTON} hidden sm:flex`}>
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {count > 1 && (
            <div
              ref={thumbsRef}
              className="no-scrollbar flex shrink-0 gap-2 overflow-x-auto px-4 py-3 sm:justify-center sm:px-8 sm:py-5"
            >
              {state.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  data-index={i}
                  onClick={() => onChange(i)}
                  aria-label={`Voir la capture ${i + 1}`}
                  aria-current={i === index}
                  className={`h-12 shrink-0 overflow-hidden rounded-md border-2 transition sm:h-16 ${
                    i === index ? 'border-[#D7E2EA] opacity-100' : 'border-transparent opacity-45 hover:opacity-80'
                  }`}
                >
                  <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-auto object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
