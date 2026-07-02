'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GridBackground from './hero/GridBackground'
import GiantGlyph from './hero/GiantGlyph'
import FloatingCard from './hero/FloatingCard'
import TerminalPreview from './hero/TerminalPreview'
import StatusBadge from './hero/StatusBadge'
import ScrollIndicator from './hero/ScrollIndicator'

gsap.registerPlugin(ScrollTrigger)

// Título en dos líneas. El espacio va DENTRO del span animado (&nbsp;)
// para que el split por palabras no se coma los espacios.
const H1_LINES: { text: string; italic?: boolean }[][] = [
  [{ text: 'Tu' }, { text: 'setup' }, { text: 'Linux,' }],
  [{ text: 'generado' }, { text: 'a' }, { text: 'tu' }, { text: 'medida.', italic: true }],
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
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.35 })

      tl.from(eyebrowRef.current, { opacity: 0, y: 12, duration: 0.6 })

      if (words?.length) {
        tl.from(
          words,
          { yPercent: 110, duration: 1, ease: 'power4.out', stagger: 0.08 },
          '-=0.15'
        )
      }

      tl.from(subheadRef.current, { opacity: 0, y: 16, duration: 0.6 }, '-=0.5')
        .from(ctasRef.current, { opacity: 0, y: 12, duration: 0.6 }, '-=0.35')

      // Parallax lento del título — se siente pesado.
      if (!prefersReduced && h1Ref.current) {
        gsap.to(h1Ref.current, {
          y: -24,
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
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden">
      {/* CAPA 0 — fondo: grid + gradiente radial */}
      <GridBackground />

      {/* CAPA 1 — glifo gigante detrás de la columna derecha */}
      <GiantGlyph />

      {/* Contenedor — nunca pegado al borde del viewport */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 md:px-12">
        <div className="grid w-full grid-cols-1 gap-8 pb-16 pt-24 lg:grid-cols-12">
          {/* Columnas 1–7 — eyebrow, título, subhead, CTAs */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <div
              ref={eyebrowRef}
              className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-[#929AAB]"
            >
              Linux Setup Generator · 2026
            </div>

            <h1
              ref={h1Ref}
              className="font-display font-thin leading-[0.92] text-[#F5F5F7] text-[length:clamp(48px,9vw,130px)]"
            >
              {H1_LINES.map((line, li) => (
                <span key={li} className="block">
                  {line.map((word, wi) => (
                    <span key={wi} className="inline-block overflow-hidden align-top">
                      <span
                        className={`word-inner inline-block ${
                          word.italic ? 'italic text-[#D3D5FD]' : ''
                        }`}
                      >
                        {word.text}
                        {wi < line.length - 1 && ' '}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <p
              ref={subheadRef}
              className="mt-10 max-w-md font-sans text-base font-light leading-relaxed text-[#929AAB]"
            >
              Habla con el agente, describe cómo usas tu sistema y recibe una
              configuración Linux con script post-instalación revisable.
            </p>

            <div ref={ctasRef} className="mt-8 flex items-center gap-5">
              <a
                href="/setup"
                className="btn h-auto min-h-0 rounded-md border-none bg-[#F5F5F7] px-7 py-3.5 text-sm font-normal text-[#0B0B0D] shadow-none transition-colors duration-200 hover:bg-[#D3D5FD]"
              >
                Crear mi setup →
              </a>
              <a
                href="#preview"
                className="text-sm text-[#929AAB] underline-offset-4 transition-colors duration-200 hover:text-[#F5F5F7] hover:underline"
              >
                Ver ejemplo →
              </a>
            </div>
          </div>

          {/* Columnas 8–12 — cajas centradas verticalmente, gap consistente */}
          <div className="relative flex flex-col justify-center gap-6 lg:col-span-5">
            <FloatingCard delay={0.9} parallax={40} className="w-full max-w-[380px] lg:ml-auto">
              <TerminalPreview />
            </FloatingCard>

            {/* Badge con offset izquierdo respecto a la terminal */}
            <FloatingCard delay={1.15} parallax={60} className="self-start lg:self-end lg:mr-28">
              <StatusBadge />
            </FloatingCard>
          </div>
        </div>
      </div>

      {/* CAPA 4 — scroll indicator abajo-centro */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  )
}
