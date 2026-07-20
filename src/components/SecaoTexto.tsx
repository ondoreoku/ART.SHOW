export default function SecaoTexto({ config }: { config: any }) {
  if (!config?.titulo && !config?.conteudo) return null

  return (
    <section className="py-8 max-w-3xl mx-auto">
      {config.titulo && <h2 className="text-2xl font-semibold mb-4">{config.titulo}</h2>}
      {config.conteudo && (
        <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: config.conteudo }} />
      )}
    </section>
  )
}