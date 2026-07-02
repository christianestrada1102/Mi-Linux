'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GridBackground from './hero/GridBackground'
import GiantGlyph from './hero/GiantGlyph'
import FloatingCard from './hero/FloatingCard'
import ScrollIndicator from './hero/ScrollIndicator'

gsap.registerPlugin(ScrollTrigger)

const H1_WORDS = [
  { text: 'Tu', italic: false },
  { text: 'setup', italic: false },
  { text: 'Linux,', italic: false },
  { text: 'generado', italic: false },
  { text: 'a', italic: false },
  { text: 'tu', italic: false },
  { text: 'medida.', italic: true },
]

const TERMINAL_LINES = [
  { color: '#474A56', text: '# agente de configuración' },
  { color: '#929AAB', prefix: 'Agente:', text: '¿Para qué vas a usar Linux?' },
  { color: '#929AAB', prefix: 'Tú:', text: 'Dev web y algo de gaming' },
  { color: '#929AAB', prefix: 'Agente:', text: '¿GPU Nvidia o AMD?' },
  { color: '#D3D5FD', prefix: 'Tú:', text: 'Nvidia RTX 3060' },
  { color: '#929AAB', prefix: 'Agente:', text: 'Recomiendo CachyOS…' },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const words = h1Ref.current?.querySelectorAll<HTMLElement>('.word-inner')

    const ctx = gsap.context(() => {
      // Entrada orquestada del contenido principal.
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.35 })

      tl.from(eyebrowRef.current, { opacity: 0, y: 12, duration: 0.6 })

      if (words?.length) {
        tl.from(
          words,
          {
            yPercent: 110,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.08,
          },
          '-=0.15'
        )
      }

      tl.from(subheadRef.current, { opacity: 0, y: 16, duration: 0.6 }, '-=0.5')
        .from(ctasRef.current, { opacity: 0, y: 12, duration: 0.6 }, '-=0.35')

      // Parallax lento del título — se siente pesado.
      if (!prefersReduced && h1Ref.current) {
        gsap.to(h1Ref.current, {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[100svh] flex items-center pt-[120px] pb-[80px] md:pt-[140px]"
    >
      {/* CAPA 0 — grid de fondo */}
      <GridBackground />

      {/* CAPA 1 — glifo gigante de profundidad */}
      <GiantGlyph />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12">
        {/* CAPA 4 — eyebrow */}
        <div
          ref={eyebrowRef}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#929AAB] mb-8"
        >
          Linux Setup Generator · 2026
        </div>

        {/* CAPA 2 — título como statement */}
        <h1
          ref={h1Ref}
          className="max-w-[16ch] text-[#F5F5F7]"
          style={{
            fontFamily: 'var(--font-dxgaster)',
            fontWeight: 100,
            fontSize: 'clamp(40px, 11vw, 150px)',
            lineHeight: 0.9,
          }}
        >
          {H1_WORDS.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-top"
              style={{ marginRight: i === H1_WORDS.length - 1 ? 0 : '0.22em' }}
            >
              <span
                className="word-inner inline-block"
                style={
                  word.italic
                    ? { fontStyle: 'italic', color: '#D3D5FD' }
                    : undefined
                }
              >
                {word.text}
              </span>
            </span>
          ))}
        </h1>

        {/* CAPA 4 — subhead + CTAs */}
        <div className="mt-10 max-w-[460px]">
          <p
            ref={subheadRef}
            className="font-sans font-light text-[16px] leading-[1.6] text-[#929AAB]"
          >
            Habla con el agente, describe cómo usas tu sistema y recibe una
            configuración Linux con script post-instalación revisable.
          </p>

          <div ref={ctasRef} className="mt-8 flex items-center gap-5">
            <a
              href="/setup"
              className="inline-flex items-center rounded-md bg-[#F5F5F7] px-7 py-3.5 text-sm text-[#0B0B0D] transition-colors duration-200 hover:bg-[#D3D5FD]"
            >
              Crear mi setup →
            </a>
            <a
              href="#preview"
              className="text-sm text-[#929AAB] underline-offset-[3px] transition-colors duration-200 hover:text-[#F5F5F7] hover:underline"
            >
              Ver ejemplo →
            </a>
          </div>
        </div>

        {/* CAPA 3 — cajas flotantes (desktop: absolutas y asimétricas) */}
        {/* Caja 1 — mini terminal, superior derecha */}
        <div className="lg:pointer-events-none lg:absolute lg:inset-0 lg:z-20">
          <div className="mt-12 lg:mt-0 lg:pointer-events-auto lg:absolute lg:right-0 lg:top-[8%] lg:w-[360px]">
            <FloatingCard delay={0.9} parallax={40} className="p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <span className="font-mono text-[10px] text-[#474A56]">mi-linux — agente</span>
              </div>
              <div className="flex flex-col gap-2 font-mono text-[12px] leading-relaxed">
                {TERMINAL_LINES.map((line, i) => (
                  <div key={i} style={{ color: line.color }}>
                    {line.prefix && <span className="font-medium">{line.prefix} </span>}
                    {line.text}
                  </div>
                ))}
                <span className="animate-pulse text-[#F5F5F7]">█</span>
              </div>
            </FloatingCard>
          </div>

          {/* Caja 2 — badge de estado, inferior con offset */}
          <div className="mt-5 lg:mt-0 lg:pointer-events-auto lg:absolute lg:right-[14%] lg:bottom-[10%]">
            <FloatingCard delay={1.15} parallax={60} className="px-5 py-3.5">
              <div className="flex items-center gap-3 font-mono text-[12px]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#27C93F] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#27C93F]" />
                </span>
                <span className="text-[#929AAB]">
                  <span className="text-[#F5F5F7]">v0.1</span> · Arch + CachyOS
                </span>
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>

      {/* CAPA 4 — indicador de scroll */}
      <div className="absolute bottom-8 left-6 z-10 md:left-12">
        <ScrollIndicator />
      </div>
    </section>
  )
}
