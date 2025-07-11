import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "axios"
import HeaderLogado from "../../components/Header-logado"

interface Usuario {
  id: string
  nome: string
  email: string
  curso?: string
  departamento?: string
  fotoPerfil?: string
  dataCriacao?: string
  cidade?: string
}

function decodeJwtPayload(token: string): any {
  try {
    const payload = token.split(".")[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

function formatarData(dataString?: string) {
  if (!dataString) return "Não informado"
  const data = new Date(dataString)
  return data.toLocaleDateString("pt-BR")
}

export default function PerfilCompleto() {
  const router = useRouter()
  const { id } = router.query
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  useEffect(() => {
    if (!id) return

    const token = localStorage.getItem("token")
    const payload = decodeJwtPayload(token || "")

    if (!token || !payload || String(payload.sub) !== String(id)) {
      router.replace("/login")
      return
    }

    axios.get(`http://localhost:3001/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setUsuario(res.data)
    })
  }, [id])

  function voltarAoFeed() {
    router.push(`/feedLogado/${id}`)
  }

  if (!usuario) return null

  return (
    <div className="min-h-screen cor-fundo">
      <HeaderLogado />
      <main className="pt-24 text-black flex flex-col items-center justify-center font-sans p-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Perfil, {usuario.nome}!</h1>
          <p className="text-lg mb-2">Email: {usuario.email}</p>
          <p className="text-md mb-8">ID do usuário: {usuario.id}</p>

          <div className="mt-12 w-full max-w-4xl text-left">
            <h2 className="text-2xl font-semibold mb-6">Seu perfil</h2>
            <div className="to-black rounded-lg p-6">
              <p>Curso: {usuario.curso || "Não informado"}</p>
              <p>Departamento: {usuario.departamento || "Não informado"}</p>
              <p>Cidade: {usuario.cidade || "Não informado"}</p>
              <p>Data de criação: {formatarData(usuario.dataCriacao)}</p>

              <button
                onClick={voltarAoFeed}
                className="px-10 py-4 bg-amber-400 text-white rounded-full font-semibold shadow hover:bg-amber-500 transition"
              >
                Feed
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

