'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Capa 4 — indicador de scroll con bounce infinito sutil.
export default function ScrollIndicator() {
  const arrowRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = arrowRef.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const tween = gsap.to(el, {
      y: 8,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <div className="flex flex-col items-center gap-2 text-[#474A56]">
      <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#1F1F26]">
        <span ref={arrowRef} className="text-sm text-[#929AAB]">↓</span>
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
    </div>
  )
}
