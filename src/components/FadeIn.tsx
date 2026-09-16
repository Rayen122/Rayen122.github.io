import { motion } from 'framer-motion'
import type { MotionProps } from 'framer-motion'
import type { ComponentType, CSSProperties, ElementType, ReactNode } from 'react'

type FadeInProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  style?: CSSProperties
  delay?: number
  duration?: number
  x?: number
  y?: number
}

type MotionTagProps = MotionProps & {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/**
 * motion.create() returns a brand new component on every call, which would remount
 * the children on each render — so each element type is created once and cached.
 */
const cache = new Map<ElementType, ComponentType<MotionTagProps>>()

function motionFor(as: ElementType): ComponentType<MotionTagProps> {
  let component = cache.get(as)
  if (!component) {
    component = motion.create(as) as unknown as ComponentType<MotionTagProps>
    cache.set(as, component)
  }
  return component
}

export default function FadeIn({
  children,
  as = 'div',
  className,
  style,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
}: FadeInProps) {
  const MotionTag = motionFor(as)

  return (
    // oxlint-disable-next-line react/static-components -- motionFor() reads from a module-level cache
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  )
}
