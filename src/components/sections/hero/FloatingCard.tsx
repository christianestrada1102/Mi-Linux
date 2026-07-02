'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

type FloatingCardProps = {
  children: ReactNode
  className?: string
  delay?: number
  // Distancia de parallax en scroll (px) — cada caja va a distinta velocidad.
  parallax?: number
}

export default function FloatingCard({
  children,
  className,
  delay = 0,
  parallax = 0,
}: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || parallax === 0) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: -parallax,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [parallax])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn('rounded-xl border border-[#1F1F26] bg-[#111114]', className)}
    >
      {children}
    </motion.div>
  )
}
