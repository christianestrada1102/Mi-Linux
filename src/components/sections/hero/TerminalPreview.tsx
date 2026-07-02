// Mini-terminal con el diálogo del agente — contenido de la caja flotante 1.

const TERMINAL_LINES = [
  { className: 'text-[#474A56]', text: '# agente de configuración' },
  { className: 'text-[#929AAB]', prefix: 'Agente:', text: '¿Para qué vas a usar Linux?' },
  { className: 'text-[#929AAB]', prefix: 'Tú:', text: 'Dev web y algo de gaming' },
  { className: 'text-[#929AAB]', prefix: 'Agente:', text: '¿GPU Nvidia o AMD?' },
  { className: 'text-[#D3D5FD]', prefix: 'Tú:', text: 'Nvidia RTX 3060' },
  { className: 'text-[#929AAB]', prefix: 'Agente:', text: 'Recomiendo CachyOS…' },
]

export default function TerminalPreview() {
  return (
    <div className="p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <span className="font-mono text-[10px] text-[#474A56]">mi-linux — agente</span>
      </div>

      <div className="flex flex-col gap-2 font-mono text-xs leading-relaxed">
        {TERMINAL_LINES.map((line, i) => (
          <div key={i} className={line.className}>
            {line.prefix && <span className="font-medium">{line.prefix} </span>}
            {line.text}
          </div>
        ))}
        <span className="animate-pulse text-[#F5F5F7]">█</span>
      </div>
    </div>
  )
}
