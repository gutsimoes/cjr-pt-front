"use client"

import Link from "next/link"
import { useRouter } from "next/router"
import { User, LogOut } from "lucide-react"

interface HeaderProps {
  isLoggedIn?: boolean
  onLogout?: () => void
}

export default function Header({ isLoggedIn = false, onLogout }: HeaderProps) {
  const router = useRouter()

  const handleProfileClick = () => {
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

  const handleInicioClick = () => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        router.push(`/feedLogado/${payload.sub}`)
      } catch (error) {
        console.error("Erro ao decodificar token:", error)
        router.push("/")
      }
    } else {
      router.push("/")
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logopokemon.png" alt="Logo" className="h-14 w-auto drop-shadow-lg" />
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={handleInicioClick}
            className="text-[#043452]/90 hover:text-[#043452] transition-colors font-medium drop-shadow-md cursor-pointer"
          >
            Início
          </button>
        </nav>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <Link href="/login">
              <button className="w-[150px] h-[45px] bg-gradient-to-r from-[#ffa45d] to-amber-500 text-white font-semibold rounded-full hover:from-[#ff9a47] hover:to-amber-600 transition-all duration-300 shadow-lg">
                Login
              </button>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              {/* Ícone do Perfil - Clique direto para o perfil */}
              <button
                onClick={handleProfileClick}
                className="flex items-center justify-center w-[45px] h-[45px] bg-gradient-to-r from-[#ffa45d] to-amber-500 text-white rounded-full hover:from-[#ff9a47] hover:to-amber-600 transition-all duration-300 shadow-lg"
                title="Meu Perfil"
              >
                <User size={20} />
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
          )}
        </div>
      </div>
    </header>
  )
}
