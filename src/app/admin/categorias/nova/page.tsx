import { criarCategoria } from '../actions'
import CategoriaForm from '../CategoriaForm'

export default function NovaCategoriaPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Nova Categoria</h1>
      <CategoriaForm action={criarCategoria} />
    </div>
  )
}