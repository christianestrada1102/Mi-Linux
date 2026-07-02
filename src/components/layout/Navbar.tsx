'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#para-quien', label: 'Para quién' },
  { href: '#roadmap', label: 'Roadmap' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    gsap.from(navRef.current, {
      opacity: 0,
      y: -16,
      duration: 0.6,
      delay: 0.2,
      ease: 'power2.out',
    })
  }, [])

  return (
    <nav
      ref={navRef}
      className={cn(
        'sticky top-0 z-50 h-14 md:h-16 flex items-center justify-between',
        'px-6 md:px-12 transition-all duration-[400ms] border-b',
        scrolled
          ? 'bg-[rgba(11,11,13,0.75)] backdrop-blur-[16px] border-[#1F1F26]'
          : 'bg-transparent border-transparent'
      )}
    >
      <a href="/" className="flex items-center gap-2.5 shrink-0">
        <img
          src="/images/MiLinux_favicon_variacion4.png"
          alt="Mi Linux"
          width={32}
          height={32}
          className="object-contain"
        />
        <span className="font-display text-lg font-thin text-[#F5F5F7]">
          Mi Linux
        </span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-sans text-sm text-[#929AAB] hover:text-[#F5F5F7] transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        href="/setup"
        className={cn(
          'font-sans text-[13px] rounded-md border border-[#2A2A33]',
          'px-4 py-2 text-[#F5F5F7] hover:bg-[#111114] transition-colors duration-200'
        )}
      >
        Crear mi setup →
      </a>
    </nav>
  )
}
