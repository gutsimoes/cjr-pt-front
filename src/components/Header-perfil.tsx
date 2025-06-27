"use client"

import { useRouter } from "next/router"
import { LogOut, ArrowLeft, User } from "lucide-react"

interface HeaderPerfilProps {
  onLogout?: () => void
  onVoltarFeed?: () => void
}

export default function HeaderPerfil({ onLogout, onVoltarFeed }: HeaderPerfilProps) {
  const router = useRouter()

  const handleVoltarFeed = () => {
    if (onVoltarFeed) {
      onVoltarFeed()
    } else {
      // Fallback: pegar ID do token e voltar ao feed
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]))
          router.push(`/feedLogado/${payload.sub}`)
        } catch (error) {
          console.error("Erro ao decodificar token:", error)
          router.push("/")
        }
      }
    }
  }

  const handlePerfilClick = () => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        router.push(`/perfilLogado/${payload.sub}`)
      } catch (error) {
        console.error("Erro ao decodificar token:", error)
      }
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo - Clicável para ir ao perfil */}
        <div className="flex items-center">
          <button onClick={handlePerfilClick} className="hover:opacity-80 transition-opacity">
            <img src="/logopokemon.png" alt="Logo" className="h-14 w-auto drop-shadow-lg" />
          </button>
        </div>

        {/* Título da página e nome do usuário - Clicável para ir ao perfil */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handlePerfilClick}
            className="flex items-center gap-2 text-[#043452]/90 font-medium drop-shadow-md hover:text-[#043452] transition-colors cursor-pointer"
          >
            <User size={20} />
            <span>Perfil</span>
          </button>
        </div>

        {/* Botões de ação */}
        <div className="flex items-center gap-3">
          {/* Botão Voltar ao Feed */}
          <button
            onClick={handleVoltarFeed}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ffa45d] to-amber-500 text-white font-semibold rounded-full hover:from-[#ff9a47] hover:to-amber-600 transition-all duration-300 shadow-lg"
            title="Voltar ao Feed"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Feed</span>
          </button>

          {/* Botão de Logout */}
          <button
            onClick={onLogout}
            className="flex items-center justify-center w-[45px] h-[45px] bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg"
            title="Sair"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
