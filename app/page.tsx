// src/app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-6xl font-bold text-center mb-8">
          ART.SHOW
        </h1>
        <p className="text-xl text-center text-gray-300 mb-12">
          Portfolio de Arte Contemporânea
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Portfolio</h2>
            <p className="text-gray-400 mb-4">Explora as obras de arte</p>
            <a href="/portfolio" className="text-blue-400 hover:underline">
              Ver Obras →
            </a>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Comissões</h2>
            <p className="text-gray-400 mb-4">Encomenda uma obra personalizada</p>
            <a href="/comissoes" className="text-blue-400 hover:underline">
              Saber Mais →
            </a>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Sobre</h2>
            <p className="text-gray-400 mb-4">Conhece a artista</p>
            <a href="/sobre" className="text-blue-400 hover:underline">
              Ler Mais →
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}