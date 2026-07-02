'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

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
  { color: '#474A56', text: '# Mi Linux — agente de configuración' },
  { color: '#929AAB', prefix: 'Agente:', text: '¿Para qué vas a usar Linux?' },
  { color: '#929AAB', prefix: 'Tú:', text: 'Para desarrollo web y algo de gaming' },
  { color: '#929AAB', prefix: 'Agente:', text: '¿Tienes GPU Nvidia o AMD?' },
  { color: '#D3D5FD', prefix: 'Tú:', text: 'Nvidia RTX 3060' },
  { color: '#929AAB', prefix: 'Agente:', text: 'Recomiendo CachyOS con kernel-cachyos...' },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const techLineRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const words = h1Ref.current?.querySelectorAll<HTMLElement>('.word-inner')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.3 })

    tl.from(eyebrowRef.current, { opacity: 0, y: 12, duration: 0.6 })

    if (words?.length) {
      tl.from(
        words,
        {
          yPercent: 110,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.06,
        },
        '-=0.2'
      )
    }

    tl.from(subheadRef.current, { opacity: 0, y: 16, duration: 0.6 }, '-=0.4')
      .from(ctasRef.current, { opacity: 0, y: 12, duration: 0.6 }, '-=0.3')
      .from(techLineRef.current, { opacity: 0, duration: 0.5 }, '-=0.3')
      .from(terminalRef.current, { opacity: 0, y: 16, duration: 0.7 }, '-=0.4')

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="pt-[120px] pb-[60px] md:pt-[160px] md:pb-[80px]"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-12 md:gap-16 md:min-h-[calc(100vh-160px)] items-center">
        {/* Columna izquierda — texto */}
        <div className="flex flex-col">
          <div
            ref={eyebrowRef}
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#929AAB] mb-6"
          >
            LINUX SETUP GENERATOR · 2026
          </div>

          <h1
            ref={h1Ref}
            className="font-display text-[#F5F5F7]"
            style={{
              fontFamily: 'var(--font-dxgaster)',
              fontWeight: 100,
              fontSize: 'clamp(40px, 9vw, 108px)',
              lineHeight: 0.95,
            }}
          >
            {H1_WORDS.map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-top"
                style={{ marginRight: i === H1_WORDS.length - 1 ? 0 : '0.28em' }}
              >
                <span
                  className="word-inner inline-block"
                  style={word.italic ? { fontStyle: 'italic' } : undefined}
                >
                  {word.text}
                </span>
              </span>
            ))}
          </h1>

          <p
            ref={subheadRef}
            className="font-sans font-light text-[17px] leading-[1.65] text-[#929AAB] max-w-[480px] mt-8"
          >
            Habla con nuestro agente, describe cómo usas tu sistema, y recibe una
            configuración Linux personalizada con script post-instalación revisable.
          </p>

          <div ref={ctasRef} className="flex items-center gap-4 mt-10">
            <a
              href="/setup"
              className="inline-flex items-center rounded-md bg-[#F5F5F7] text-[#0B0B0D] px-7 py-3.5 text-sm transition-colors duration-200 hover:bg-[#D3D5FD]"
            >
              Crear mi setup →
            </a>
            <a
              href="#preview"
              className="text-sm text-[#929AAB] hover:text-[#F5F5F7] hover:underline underline-offset-[3px] transition-colors duration-200"
            >
              Ver ejemplo →
            </a>
          </div>

          <div
            ref={techLineRef}
            className="font-mono text-[11px] text-[#474A56] flex items-center gap-2 mt-12"
          >
            <span>Compatible con Arch</span>
            <span>·</span>
            <span>CachyOS</span>
            <span>·</span>
            <span className="text-[#D3D5FD]">más próximamente</span>
          </div>
        </div>

        {/* Columna derecha — terminal mockup */}
        <div
          ref={terminalRef}
          className="rounded-xl border border-[#1F1F26] bg-[#111114] p-6 font-mono text-[13px] leading-relaxed"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <span className="text-[11px] text-[#474A56]">mi-linux — agente</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {TERMINAL_LINES.map((line, i) => (
              <div key={i} style={{ color: line.color }}>
                {line.prefix && <span className="font-medium">{line.prefix} </span>}
                {line.text}
              </div>
            ))}
            <span className="text-[#F5F5F7] animate-pulse">█</span>
          </div>
        </div>
      </div>
    </section>
  )
}
