'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Líneas verticales sutiles — textura de fondo estilo editorial.
// En desktop mostramos más columnas; en mobile reducimos densidad.
const LINE_COUNT = 9

export default function GridBackground() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lines = rootRef.current?.querySelectorAll<HTMLElement>('.grid-line')
    if (!lines?.length) return

    if (prefersReduced) {
      gsap.set(lines, { scaleY: 1, opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          transformOrigin: 'top',
          duration: 1.1,
          ease: 'power3.inOut',
          stagger: 0.05,
          delay: 0.15,
        }
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {Array.from({ length: LINE_COUNT }).map((_, i) => (
        <span
          key={i}
          className="grid-line absolute top-0 bottom-0 w-px bg-[#1F1F26]"
          style={{
            left: `${(100 / (LINE_COUNT - 1)) * i}%`,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  )
}
