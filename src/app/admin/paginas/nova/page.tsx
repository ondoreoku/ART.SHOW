import { criarPagina } from '../actions'
import PaginaForm from '../PaginaForm'

export default function NovaPaginaPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Nova Página</h1>
      <PaginaForm action={criarPagina} />
    </div>
  )
}