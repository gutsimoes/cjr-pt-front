"use client"
import { useState, useEffect } from "react"
import HeaderLogado from "./Header-logado"
import HeaderDeslogado from "./Header-deslogado"

interface HeaderProps {
    onLogout?: () => void
}

function Header({ onLogout }: HeaderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userInfo, setUserInfo] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        checkAuthStatus()
    }, [])

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem("token")

            if (!token) {
                setIsLoggedIn(false)
                setIsLoading(false)
                return
            }

            // Decodificar token para verificar se é válido
            const payload = decodeJwtPayload(token)
            if (!payload?.sub) {
                setIsLoggedIn(false)
                localStorage.removeItem("token") // Remove token inválido
                setIsLoading(false)
                return
            }

            // Caso contrário, buscar dados do usuário
            const response = await fetch(`http://localhost:3001/user/${payload.sub}`, {
                headers: { Authorization: `Bearer ${token}` },
            })

            if (response.ok) {
                const userData = await response.json()
                setUserInfo(userData)
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
                localStorage.removeItem("token") // Remove token inválido
            }
        } catch (error) {
            console.error("Erro ao verificar autenticação:", error)
            setIsLoggedIn(false)
            localStorage.removeItem("token")
        } finally {
            setIsLoading(false)
        }
    }

    const decodeJwtPayload = (token: string): any => {
        try {
            const payload = token.split(".")[1]
            return JSON.parse(atob(payload))
        } catch {
            return null
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        setUserInfo(null)

        if (onLogout) {
            onLogout()
        } else {
            window.location.href = "/"
        }
    }

    // Mostrar loading mínimo para evitar flash
    if (isLoading) {
        return (
            <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <img src="/logopokemon.png" alt="Logo" className="h-14 w-auto drop-shadow-lg opacity-50" />
                    <div className="w-[150px] h-[45px] bg-gray-200 rounded-full animate-pulse"></div>
                </div>
            </header>
        )
    }

    // Renderizar header apropriado
    if (isLoggedIn && userInfo) {
        return <HeaderLogado onLogout={handleLogout} />
    } else {
        return <HeaderDeslogado />
    }
}

export default Header
