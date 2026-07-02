'use client'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center gap-2 font-sans font-medium transition-all duration-200 rounded-md cursor-pointer'

  const variants = {
    primary:   'bg-[#F5F5F7] text-[#0B0B0D] hover:bg-[#D3D5FD]',
    secondary: 'bg-transparent text-[#F5F5F7] border border-[#2A2A33] hover:bg-[#111114] hover:border-[#929AAB]',
    ghost:     'bg-transparent text-[#929AAB] hover:text-[#F5F5F7]',
  }

  const sizes = {
    sm:  'text-xs px-3 py-2',
    md:  'text-sm px-5 py-3',
    lg:  'text-base px-7 py-4',
  }

  if (href) {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], sizes[size], className)}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
