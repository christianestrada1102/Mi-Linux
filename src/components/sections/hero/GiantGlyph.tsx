'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Glifo gigante ">" — el prompt de la terminal como textura de profundidad.
// Apenas visible sobre el fondo; da capa y peso, no es contenido legible.
export default function GiantGlyph() {
  const glyphRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = glyphRef.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={glyphRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
    >
      <span
        className="leading-none text-[#16161A]"
        style={{
          fontFamily: 'var(--font-dxgaster)',
          fontWeight: 100,
          fontSize: 'clamp(320px, 52vw, 680px)',
          transform: 'rotate(-6deg)',
        }}
      >
        &gt;
      </span>
    </div>
  )
}
