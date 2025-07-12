"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { useRouter } from "next/router"
import { Search, MessageSquare } from "lucide-react"
import Header from "../../components/header"
import ProfessorCard from "../../components/ProfessorCard"
import BotaoOrdenar from "../../components/botao-ordenar"
import { ModalComentario } from "../../components/modal-comentario"
import { ModalProfessor } from "../../components/modal-professor"

interface Disciplina {
  id: number
  nome: string
}

interface Professor {
  id: number
  nome: string
  departamento: string
  disciplinaID: number
  createdAt: string
  updatedAt: string
  disciplina: Disciplina
  imagem?: string | null
}

export default function FeedLogado() {
  const router = useRouter()
  const { id } = router.query
  const [usuario, setUsuario] = useState<any>(null)
  const [professores, setProfessores] = useState<Professor[]>([])
  const [professoresNovos, setProfessoresNovos] = useState<Professor[]>([])
  const [todosProfessores, setTodosProfessores] = useState<Professor[]>([])
  const [valorBusca, setValorBusca] = useState("")
  const [ordenacao, setOrdenacao] = useState("nome")
  const [isLoading, setIsLoading] = useState(true)
  const [modalProfessorOpen, setModalProfessorOpen] = useState(false)
  const [modalComentarioOpen, setModalComentarioOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const payload = token ? decodeJwtPayload(token) : null
    // Se não tiver token ou se o id do token não bate com o da URL, joga pra página de login
    if (!token || (id && String(payload?.sub) !== String(id))) {
      router.replace("/login")
      return
    }

    if (id) {
      // Pega as infos do usuário no backend
      fetch(`http://localhost:3001/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (res) => {
          // se der ruim, manda pro login
          if (res.status === 401) {
            router.replace("/login")
            return
          }
          const data = await res.json()
          setUsuario(data) // guarda o usuário
        })
        .catch(() => {
          router.replace("/login") // se der erro, manda pro login também
        })

      // Pega a lista de professores
      fetch("http://localhost:3001/professor", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setProfessores(data)
          setTodosProfessores(data)
          // Pega os 4 professores que chegaram por último
          const sorted = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          setProfessoresNovos(sorted.slice(0, 4))
          setIsLoading(false)
        })
    }
  }, [id, router])

  function decodeJwtPayload(token: string): any {
    try {
      const payload = token.split(".")[1]
      return JSON.parse(atob(payload))
    } catch {
      return null
    }
  }

  // Abrir e fechar os modais
  const handleOpenModalProfessor = () => setModalProfessorOpen(true)
  const handleCloseModalProfessor = () => setModalProfessorOpen(false)
  const handleOpenModalComentario = () => setModalComentarioOpen(true)
  const handleCloseModalComentario = () => setModalComentarioOpen(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.replace("/login")
  }

  // Fazer logout: limpa o token e joga pra tela de login
  const handleChange = (value: string) => setValorBusca(value)
  const handleBuscar = () => console.log("Buscar por:", valorBusca)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleBuscar()
  }

  // filtra a lista de professores de acordo com o que foi digitado na busca
  const professoresFiltrados = todosProfessores.filter((prof) =>
    prof.nome.toLowerCase().includes(valorBusca.toLowerCase()),
  )

  // ordena os professores filtrados 
  const professoresOrdenados = [...professoresFiltrados].sort((a, b) => {
    switch (ordenacao) {
      case "nome":
        return String(a.nome || "").localeCompare(String(b.nome || ""))
      case "disciplina":
        return String(a.disciplina?.nome || "").localeCompare(String(b.disciplina?.nome || ""))
      case "departamento":
        return String(a.departamento || "").localeCompare(String(b.departamento || ""))
      case "id":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "mais_antigo":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      default:
        return 0
    }
  })


  // Enquanto não tiver os dados do usuário, mostra essa tela de carregamento
  if (!usuario) {
    return (
      <div className="min-h-screen bg-white">
        <Header isLoggedIn={true} userName="" onLogout={handleLogout} />
        <div className="pt-24 flex items-center justify-center">
          <p className="text-gray-600 text-center text-lg animate-pulse">Carregando usuário...</p>
        </div>
      </div>
    )
  }

  // A tela que o usuário vai ver
  return (
    <div className="min-h-screen bg-orange-50 relative">
      <Header isLoggedIn={true} userName={usuario.nome} onLogout={handleLogout} />
      <main className="relative z-0 pt-32 px-6 pb-24 max-w-7xl mx-auto space-y-32">
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-4 tracking-tight">
            Bem-vindo,{" "}
            <span className="bg-gradient-to-r from-[#ffa45d] to-amber-500 bg-clip-text text-transparent">
              {usuario.nome}
            </span>
          </h1>
          <p className="text-xl text-[#043452]/80">Aqui começa a sua jornada para os melhores professores ;)</p>
        </section>

        <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-[#ffa45d]/20">
          <h2 className="text-4xl font-bold text-[#043452] mb-2">Novos Professores</h2>
          <p className="text-xl text-[#043452]/80 mb-6">Conheça os novos talentos que estão sendo avaliados</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {professoresNovos.map((prof) => (
              <ProfessorCard
                key={prof.id}
                id={prof.id}
                nome={prof.nome}
                disciplina={prof.disciplina?.nome || "Disciplina não informada"}
                departamento={prof.departamento}
                imagem={prof.imagem || null}
              />
            ))}
          </div>
        </section>

        <div className="relative w-full max-w-3xl lg:max-w-4xl mx-auto">
          <input
            type="text"
            value={valorBusca}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Buscar professor..."
            className="w-full rounded-full border-2 border-[#ffa45d]/30 bg-white/50 backdrop-blur-md px-8 py-6 pr-20 text-[#043452] placeholder-[#043452]/70 focus:outline-none focus:ring-4 focus:ring-[#ffa45d]/40 focus:border-[#ffa45d] transition-all duration-300 shadow-xl text-xl"
          />
          <button
            onClick={handleBuscar}
            className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#ffa45d] hover:bg-[#ff9142] rounded-full flex items-center justify-center transition-colors duration-200 shadow-md"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <button
            onClick={handleOpenModalProfessor}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#043452] hover:bg-[#06567b] text-white font-semibold text-lg shadow-md transition-all duration-300"
          >
            <span className="text-xl font-bold">+</span>
            Novo Professor
          </button>

          <button
            onClick={handleOpenModalComentario}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#ffa45d] hover:bg-[#ff9142] text-white font-semibold text-lg shadow-md transition-all duration-300"
          >
            <MessageSquare className="w-5 h-5" />
            Avaliar Professor
          </button>
        </div>

        <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-[#ffa45d]/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold text-[#043452] mb-2">
                Todos os Professores ({professoresFiltrados.length})
              </h2>
              <p className="text-xl text-[#043452]/80">Explore nossa comunidade completa de educadores</p>
            </div>
            <div className="mt-6 lg:mt-0">
              <BotaoOrdenar ordenacao={ordenacao} onChange={setOrdenacao} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {professoresOrdenados.map((prof) => (
              <ProfessorCard
                key={prof.id}
                id={prof.id}
                nome={prof.nome}
                disciplina={prof.disciplina?.nome || "Disciplina não informada"}
                departamento={prof.departamento}
                imagem={prof.imagem || null}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Modal para adicionar professor */}
      <ModalProfessor isOpen={modalProfessorOpen} onClose={handleCloseModalProfessor} />

      {/* Modal para avaliar professor */}
      <ModalComentario isOpen={modalComentarioOpen} onClose={handleCloseModalComentario} />
    </div>
  )
}