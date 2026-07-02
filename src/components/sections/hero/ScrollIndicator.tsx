'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Indicador de scroll con bounce infinito sutil.
export default function ScrollIndicator() {
  const dotRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = dotRef.current
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
    <div className="flex items-center gap-3 text-[#474A56]">
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1F1F26]">
        <span ref={dotRef} className="text-[#929AAB]">↓</span>
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
    </div>
  )
}
