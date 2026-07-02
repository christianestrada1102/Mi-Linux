import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const dxGaster = localFont({
  src: [
    {
      path: '../../public/fonts/DxGaster-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/DxGaster-ThinItalic.otf',
      weight: '100',
      style: 'italic',
    },
  ],
  variable: '--font-dxgaster',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mi Linux — Tu setup Linux, generado a tu medida',
  description: 'Habla con nuestro agente, obtén tu distro ideal y descarga tu script post-instalación. Sin comandos a ciegas.',
  openGraph: {
    title: 'Mi Linux — Tu setup Linux, generado a tu medida',
    description: 'Agente IA que configura Linux a tu medida.',
    images: ['/images/hero-distros.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0B0B0D',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`
        ${inter.variable}
        ${jetbrainsMono.variable}
        ${dxGaster.variable}
      `}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
