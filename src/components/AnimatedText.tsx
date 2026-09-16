import { Fragment, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

type AnimatedTextProps = {
  text: string
  className?: string
  style?: React.CSSProperties
}

function Char({
  char,
  progress,
  range,
}: {
  char: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.2, 1])

  return (
    <span className="relative inline-block">
      <span className="opacity-0">{char}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char}
      </motion.span>
    </span>
  )
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })

  const words = text.split(' ')
  const total = [...text].length

  // Where each word starts in the character stream, so a word's letters keep
  // their place in the reveal even though they render as one nowrap block.
  const offsets: number[] = []
  words.reduce((acc, word) => {
    offsets.push(acc)
    return acc + [...word].length + 1 // + the space that follows
  }, 0)

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, w) => {
        const chars = [...word]
        const start = offsets[w]

        return (
          <Fragment key={w}>
            <span className="inline-block whitespace-nowrap">
              {chars.map((char, i) => (
                <Char
                  key={i}
                  char={char}
                  progress={scrollYProgress}
                  range={[(start + i) / total, (start + i + 1) / total]}
                />
              ))}
            </span>
            {w < words.length - 1 ? ' ' : null}
          </Fragment>
        )
      })}
    </p>
  )
}
