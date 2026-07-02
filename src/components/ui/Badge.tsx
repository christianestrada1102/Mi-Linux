import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'muted'
  className?: string
}

export default function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps) {
  const variants = {
    default: 'border-[#2A2A33] text-[#929AAB]',
    accent:  'border-[#D3D5FD] text-[#D3D5FD]',
    muted:   'border-[#474A56] text-[#474A56]',
  }

  return (
    <span className={cn(
      'inline-flex items-center font-mono text-xs tracking-wider',
      'px-2.5 py-1 rounded-sm border',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
