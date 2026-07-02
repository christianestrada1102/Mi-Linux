'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Capa 0 — líneas verticales sutiles + gradiente radial de profundidad.
const LINE_COUNT = 10

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
          delay: 0.1,
        }
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Gradiente radial muy sutil desde el centro */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,#111114_0%,#0B0B0D_100%)]" />

      {/* Grid de columnas */}
      <div className="absolute inset-x-6 inset-y-0 grid grid-cols-10 md:inset-x-12">
        {Array.from({ length: LINE_COUNT }).map((_, i) => (
          <div key={i} className="grid-line border-l border-[#1F1F26]/40" />
        ))}
      </div>
    </div>
  )
}
