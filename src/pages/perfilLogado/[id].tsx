"use client"

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { User, Mail, GraduationCap, Building, Edit, Camera, MapPin, Calendar, ArrowLeft } from "lucide-react"
import axios from "axios"
import HeaderPerfil from "../../components/Header-perfil"

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

export default function PerfilCompleto() {
  const router = useRouter()
  const { id } = router.query

  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const payload = token ? decodeJwtPayload(token) : null

    if (!token || (id && String(payload?.sub) !== String(id))) {
      router.replace("/login")
      return
    }

    if (id) {
      fetchUsuario(id as string, token)
    }
  }, [id, router])

  const fetchUsuario = async (userId: string, token: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await axios.get(`http://localhost:3001/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setUsuario(response.data)
    } catch (error) {
      console.error("Erro ao carregar perfil:", error)

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token")
          router.replace("/login")
          return
        }
        setError(error.response?.data?.message || "Erro ao carregar perfil")
      } else {
        setError("Erro de conexão")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.replace("/login")
  }

  const voltarAoFeed = () => {
    if (usuario?.id) {
      router.push(`/feedLogado/${usuario.id}`)
    }
  }

  const editarPerfil = () => {
    // Implementar edição de perfil
    console.log("Editar perfil")
    // router.push(`/editarPerfil/${usuario?.id}`)
  }

  const alterarFoto = () => {
    // Implementar upload de foto
    console.log("Alterar foto de perfil")
  }

  const formatarData = (data: string) => {
    if (!data) return "Não informado"
    return new Date(data).toLocaleDateString("pt-BR")
  }

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f2606]">
        <HeaderPerfil />
        <div className="pt-24 flex items-center justify-center min-h-[calc(100vh-96px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#ffa45d] mx-auto mb-4"></div>
            <p className="text-white text-lg">Carregando perfil...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-[#0f2606]">
        <HeaderPerfil />
        <div className="pt-24 flex items-center justify-center min-h-[calc(100vh-96px)]">
          <div className="text-center">
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 max-w-md">
              <p className="text-red-400 text-lg mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Not Found State
  if (!usuario) {
    return (
      <div className="min-h-screen bg-[#0f2606]">
        <HeaderPerfil />
        <div className="pt-24 flex items-center justify-center min-h-[calc(100vh-96px)]">
          <div className="text-center">
            <p className="text-white text-lg">Usuário não encontrado</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 bg-[#ffa45d] hover:bg-[#ff9a47] text-white px-6 py-2 rounded-lg transition-colors"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f2606]">
      <HeaderPerfil userName={usuario.nome} onLogout={handleLogout} onVoltarFeed={voltarAoFeed} />

      <main className="pt-24 pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Card Principal do Perfil */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
            {/* Header do Card com Foto de Perfil */}
            <div className="bg-gradient-to-r from-[#ffa45d] to-amber-500 p-8 text-center relative">
              <div className="absolute top-4 right-4">
                <button
                  onClick={editarPerfil}
                  className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                  title="Editar Perfil"
                >
                  <Edit size={20} />
                </button>
              </div>

              {/* Foto de Perfil */}
              <div className="relative inline-block mb-6">
                <div className="w-36 h-36 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center overflow-hidden shadow-2xl">
                  {usuario.fotoPerfil ? (
                    <img
                      src={usuario.fotoPerfil || "/placeholder.svg"}
                      alt={usuario.nome}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={56} className="text-white/80" />
                  )}
                </div>
                <button
                  onClick={alterarFoto}
                  className="absolute bottom-2 right-2 bg-white text-[#ffa45d] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  title="Alterar Foto"
                >
                  <Camera size={18} />
                </button>
              </div>

              <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">{usuario.nome}</h1>
              <p className="text-white/90 text-lg">Perfil do Usuário</p>
            </div>

            {/* Conteúdo do Card */}
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Coluna Esquerda - Informações Pessoais */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                    <User size={24} className="text-[#ffa45d]" />
                    Informações Pessoais
                  </h2>

                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <Mail size={20} className="text-[#ffa45d]" />
                        <span className="text-white/70 text-sm font-medium">Email</span>
                      </div>
                      <p className="text-white font-medium text-lg">{usuario.email}</p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <User size={20} className="text-[#ffa45d]" />
                        <span className="text-white/70 text-sm font-medium">ID do Usuário</span>
                      </div>
                      <p className="text-white font-medium font-mono text-sm bg-white/10 px-3 py-1 rounded-lg inline-block">
                        {usuario.id}
                      </p>
                    </div>

                    {usuario.cidade && (
                      <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                          <MapPin size={20} className="text-[#ffa45d]" />
                          <span className="text-white/70 text-sm font-medium">Localização</span>
                        </div>
                        <p className="text-white font-medium text-lg">{usuario.cidade}</p>
                      </div>
                    )}

                    {usuario.dataCriacao && (
                      <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                          <Calendar size={20} className="text-[#ffa45d]" />
                          <span className="text-white/70 text-sm font-medium">Membro desde</span>
                        </div>
                        <p className="text-white font-medium text-lg">{formatarData(usuario.dataCriacao)}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Coluna Direita - Informações Acadêmicas */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                    <GraduationCap size={24} className="text-[#ffa45d]" />
                    Informações Acadêmicas
                  </h2>

                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <GraduationCap size={20} className="text-[#ffa45d]" />
                        <span className="text-white/70 text-sm font-medium">Curso</span>
                      </div>
                      <p className="text-white font-medium text-lg">
                        {usuario.curso || <span className="text-white/50 italic">Não informado</span>}
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <Building size={20} className="text-[#ffa45d]" />
                        <span className="text-white/70 text-sm font-medium">Departamento</span>
                      </div>
                      <p className="text-white font-medium text-lg">
                        {usuario.departamento || <span className="text-white/50 italic">Não informado</span>}
                      </p>
                    </div>

                    {/* Placeholder para mais informações acadêmicas */}
                    <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <GraduationCap size={20} className="text-[#ffa45d]" />
                        <span className="text-white/70 text-sm font-medium">Período</span>
                      </div>
                      <p className="text-white/50 italic">Não informado</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10 pt-8 border-t border-white/10">
                <button
                  onClick={editarPerfil}
                  className="flex-1 bg-gradient-to-r from-[#ffa45d] to-amber-500 text-white font-semibold py-4 px-8 rounded-full hover:from-[#ff9a47] hover:to-amber-600 transition-all duration-300 shadow-lg flex items-center justify-center gap-3 hover:scale-105"
                >
                  <Edit size={20} />
                  Editar Perfil
                </button>

                <button
                  onClick={voltarAoFeed}
                  className="flex-1 bg-white/10 text-white font-semibold py-4 px-8 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center gap-3 hover:scale-105"
                >
                  <ArrowLeft size={20} />
                  Voltar ao Feed
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
