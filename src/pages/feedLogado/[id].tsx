"use client"

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Header from "../../components/Header-logado"

function decodeJwtPayload(token: string): any {
  try {
    const payload = token.split(".")[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

interface Usuario {
  id: string
  nome: string
  email: string
}

export default function FeedLogado() {
  const router = useRouter()
  const { id } = router.query
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const payload = token ? decodeJwtPayload(token) : null

    if (!token || (id && String(payload?.sub) !== String(id))) {
      router.replace("/login")
      return
    }

    if (id) {
      fetch(`http://localhost:3001/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          if (res.status === 401) {
            router.replace("/login")
            return
          }

          const data = await res.json()
          setUsuario(data)
        })
        .catch(() => {
          router.replace("/login")
        })
    }
  }, [id, router])

  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem("token")
    // Redireciona para a página de login
    router.replace("/login")
  }

  const irParaPerfil = () => {
    if (usuario?.id) {
      router.push(`/perfilLogado/${usuario.id}`)
    }
  }

  if (!usuario) {
    return (
      <div className="min-h-screen bg-[#0f2606]">
        <Header isLoggedIn={false} />
        <div className="pt-24 flex items-center justify-center">
          <p className="text-white text-center text-lg">Carregando usuário...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f2606]">
      <Header isLoggedIn={true} userName={usuario.nome} onLogout={handleLogout} />

      <main className="pt-24 text-white flex flex-col items-center justify-center font-sans p-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Feed, {usuario.nome}!</h1>
          <p className="text-lg mb-2">Email: {usuario.email}</p>
          <p className="text-md mb-8">ID do usuário: {usuario.id}</p>

          <button
            onClick={irParaPerfil}
            className="px-6 py-2 bg-white text-[#0f2606] rounded-full font-semibold shadow hover:bg-gray-200 transition"
          >
            Ver meu perfil
          </button>

          {/* Aqui você pode adicionar o conteúdo do feed */}
          <div className="mt-12 w-full">
            <h2 className="text-2xl font-semibold mb-6">Seu Feed</h2>
            <div className="bg-white/10 rounded-lg p-6 text-left">
              <p className="text-gray-300">Aqui será exibido o conteúdo do seu feed...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
