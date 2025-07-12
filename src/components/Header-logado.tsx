"use client"

import { useRouter } from "next/navigation"
import { User, LogOut } from "lucide-react"
import Link from "next/link"

export default function HeaderLogado() {
  const router = useRouter()

  const handleProfileClick = () => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        router.push(`/perfil/${payload.sub}`)
      } catch (error) {
        console.error("Erro ao decodificar token:", error)
      }
    }
  }

  const handleLogoClick = () => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        router.push(`/feedLogado/${payload.sub}`)
      } catch (error) {
        console.error("Erro ao decodificar token:", error)
      }
    }
  }


  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <button onClick={handleLogoClick} className="flex items-center">
          <img src="/logopokemon.png" alt="Logo" className="h-14 w-auto drop-shadow-lg" />
        </button>

        {/* Ações (ícone usuário e logout) */}
        <div className="flex items-center gap-3">

          {/* Botão  perfil */}
          <button
            onClick={handleProfileClick}
            className="flex items-center justify-center w-[45px] h-[45px] bg-gradient-to-r from-[#ffa45d] to-amber-500 text-white rounded-full hover:from-[#ff9a47] hover:to-amber-600 transition-all shadow-lg"
            title="Perfil"
          >
            <User size={18} />
          </button>

          {/* Botão logout */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-[45px] h-[45px] bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full hover:from-red-500 hover:to-red-600 transition-all shadow-lg"
            title="Sair"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
