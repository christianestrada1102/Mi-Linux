// Badge de estado — contenido de la caja flotante 2.
export default function StatusBadge() {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5 font-mono text-xs">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#27C93F] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#27C93F]" />
      </span>
      <span className="text-[#929AAB]">
        <span className="text-[#F5F5F7]">v0.1</span> · Arch + CachyOS
      </span>
    </div>
  )
}
