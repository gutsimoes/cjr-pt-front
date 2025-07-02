"use client"

import { useRouter, useParams } from "next/navigation"  // useParams para pegar params no App Router
import { useEffect, useState } from "react"
import axios from "axios"
import HeaderLogado from "../../components/Header-logado"  // Ajuste o caminho conforme sua pasta

//props
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

//verifica token
function decodeJwtPayload(token: string): any {
  try {
    const payload = token.split(".")[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

// formata a data que vem do backend (yyyy‑mm‑dd…) para dd/mm/aaaa
function formatarData(dataString?: string) {
  if (!dataString) return "Não informado"
  const data = new Date(dataString)
  return data.toLocaleDateString("pt-BR")
}

export default function PerfilCompleto() {
  const router = useRouter() // rota dinamica
  const params = useParams() // Pega parâmetros 
  const id = params?.id // Pega o id 

  const [usuario, setUsuario] = useState<Usuario | null>(null)  // dados do usuário carregados do backend
  const [loading, setLoading] = useState(true) // carregadno
  const [error, setError] = useState<string | null>(null) // mensagens de erro

  //token errado manda pro perfil 
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.replace("/login")
      return
    }
    const payload = decodeJwtPayload(token)

    // verifica se é o cara do perfil que ta vendo o perfil
    if (!payload || String(payload.sub) !== String(id)) {
      router.replace("/login")
      return
    }

    axios.get(`http://localhost:3001/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUsuario(response.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError("Erro ao carregar perfil")
        setLoading(false)
      })
  }, [id, router])

  // leva de volta ao feed
  function voltarAoFeed() {
    router.push(`/feedLogado/${id}`)
  }


  if (loading) return <div>Carregando perfil...</div>
  if (error) return <div>{error}</div>
  if (!usuario) return <div>Usuário não encontrado</div>

  // Renderização principal do perfil
  return (
    <div className="min-h-screen cor-fundo">
      <HeaderLogado />
      <main className="pt-24 text-black flex flex-col items-center justify-center font-sans p-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Perfil, {usuario.nome}!</h1>
          <p className="text-lg mb-2">Email: {usuario.email}</p>
          <p className="text-md mb-8">ID do usuário: {usuario.id}</p>

          {/* Conteúdo do perfil */}
          <div className="mt-12 w-full max-w-4xl text-left">
            <h2 className="text-2xl font-semibold mb-6">Seu perfil</h2>
            <div className="to-black rounded-lg p-6">
              <p>Curso: {usuario.curso || "Não informado"}</p>
              <p>Departamento: {usuario.departamento || "Não informado"}</p>
              <p>Cidade: {usuario.cidade || "Não informado"}</p>
              <p>Data de criação: {formatarData(usuario.dataCriacao)}</p>
              {/* Você pode adicionar mais campos aqui */}

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
