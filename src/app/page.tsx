import Container from '@/components/ui/Container'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
      <Container>
        <h1 className="font-display text-[#F5F5F7]"
            style={{ fontFamily: 'var(--font-dxgaster)', fontSize: '80px', fontWeight: 100 }}>
          Mi Linux
        </h1>
        <p className="font-mono text-[#929AAB] text-sm mt-4">
          Sesión 1 completada — sistema de diseño listo
        </p>
      </Container>
    </main>
  )
}
