'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Capa 1 — glifo ">" gigante a la derecha, parcialmente fuera del viewport.
// Textura de profundidad detrás de las cajas flotantes, nunca detrás del título.
export default function GiantGlyph() {
  const glyphRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = glyphRef.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: -15,
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
      className="pointer-events-none absolute -right-[8%] top-1/2 -translate-y-1/2 select-none lg:-right-[4%]"
    >
      <span className="block -rotate-[8deg] font-display font-thin leading-none text-[#16161A] text-[length:clamp(280px,42vw,700px)]">
        &gt;
      </span>
    </div>
  )
}
