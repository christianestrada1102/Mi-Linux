import { cn } from '@/lib/utils'

interface SectionLabelProps {
  number: string
  label: string
  className?: string
}

export default function SectionLabel({
  number,
  label,
  className,
}: SectionLabelProps) {
  return (
    <div className={cn(
      'flex items-center gap-2 font-mono text-xs tracking-widest',
      'text-[#929AAB] uppercase mb-6',
      className
    )}>
      <span className="text-[#D3D5FD]">[ {number} ]</span>
      <span>{label}</span>
    </div>
  )
}
