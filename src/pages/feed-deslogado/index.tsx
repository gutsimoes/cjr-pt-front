"use client" // indica que esse componente roda no lado do cliente (React Server Components)

import { useState, useEffect } from "react"
import axios from "axios"
import Header from "../../components/Header-deslogado"
import ProfessorCard from "../../components/ProfessorCard"
import CampoBusca from "../../components/campo-busca"
import BotaoOrdenar from "../../components/botao-ordenar"

// Interfaces para tipagem dos dados recebidos da API
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

// Componente principal da página
export default function FeedDeslogado() {
  // Estados para controlar os dados e interações
  const [professor, getProfessor] = useState<Professor[]>([])
  const [professoresNovos, setProfessoresNovos] = useState<Professor[]>([])
  const [todosProfessores, setTodosProfessores] = useState<Professor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [erro, setErro] = useState("")
  const [busca, setBusca] = useState("")
  const [ordenacao, setOrdenacao] = useState("nome")

  //  faz a requisição do backend
  async function buscarProfessores() {
    try {
      setIsLoading(true) // ativa o loading
      setErro("") // limpa erros anteriores

      const response = await axios.get("http://localhost:3001/professor")
      let dadosProfessores = response.data

      if (response.data.professores) {
        dadosProfessores = response.data.professores
      }

      if (Array.isArray(dadosProfessores)) {
        getProfessor(dadosProfessores) // salva os professores recebidos

        // Ordena por data de criação (mais novos primeiro)
        const professorsSorted = [...dadosProfessores].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setProfessoresNovos(professorsSorted.slice(0, 4)) // pega os 4 mais novos
        setTodosProfessores(dadosProfessores) // salva todos para busca/ordenação
      } else {
        setErro("Dados inválidos recebidos do servidor")
        getProfessor([])
      }
    } catch (error) {
      // Tratamento de erro da requisição
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErro(`Erro do servidor: ${error.response.status} - ${error.response.statusText}`)
        } else if (error.request) {
          setErro("Erro na conexão com o servidor")
        } else {
          setErro("Erro na configuração da requisição")
        }
      } else {
        setErro("Erro desconhecido ao carregar professores")
      }
      getProfessor([])
    } finally {
      setIsLoading(false) // desativa o loading
    }
  }

  // Chama a função buscarProfessores ao carregar o componente
  useEffect(() => {
    buscarProfessores()
  }, [])


  // filtro com base na busca 
  const professoresFiltrados = todosProfessores.filter((prof) => {
    if (!busca.trim()) return true //  retorna todos se tiver vazio

    const nome = String(prof.nome || "").toLowerCase()
    const disciplina = String(prof.disciplina?.nome || "").toLowerCase()
    const departamento = String(prof.departamento || "").toLowerCase()
    const termoBusca = busca.toLowerCase().trim()

    // Retorna se algum campo contém o termo buscado
    return nome.includes(termoBusca) || disciplina.includes(termoBusca) || departamento.includes(termoBusca)
  })

  // ordena os professores filtrados  com cada criterio sleecionado pelo botao ordenar
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
      default:
        return 0
    }
  })

  // atualiza o estado de busca ao digitar
  const handleBuscar = (termo: string) => {
    setBusca(termo)
  }


  // Página principal
  return (
    <div className="min-h-screen bg-orange-50">
      <Header />
      <main className="relative z-10 pt-32 px-6 pb-24 max-w-7xl mx-auto space-y-32">
        {/* Título principal com texto interativo com o mouse*/}
        <section className="text-center max-w-4xl mx-auto group">
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-8 tracking-tight">
            Encontre os<br />
            <span className="bg-gradient-to-r from-[#ffa45d] to-amber-500 bg-clip-text text-transparent transition-opacity duration-300">
              <span className="inline group-hover:hidden">Melhores&nbsp;</span>
              <span className="hidden group-hover:inline">Piores&nbsp;</span>
            </span>
            Professores
          </h1>
          <p className="mt-6 text-2xl text-[#043452]/90 max-w-3xl mx-auto leading-relaxed font-medium">
            <span className="inline group-hover:hidden">Encontre aqui os melhores professores!!!</span>
            <span className="hidden group-hover:inline">
              Ou talvez você prefira os mais... interessantes? Todos têm algo a ensinar!
            </span>
          </p>
        </section>

        {/* Seção dos professores mais recentes */}
        <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-[#ffa45d]/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold text-[#043452] mb-2">Novos Professores</h2>
              <p className="text-xl text-[#043452]/80">Conheça os novos talentos que estão sendo avaliados</p>
            </div>
          </div>

          {professoresNovos.length > 0 ? (
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
          ) : (
            <div className="text-center py-8">
              <p className="text-xl text-[#043452]/70">Nenhum professor novo encontrado</p>
            </div>
          )}
        </section>

        {/* Campo de busca */}
        <div className="flex justify-center">
          <CampoBusca valor={busca} onChange={setBusca} onBuscar={handleBuscar} />
        </div>

        {/* Lista completa de professores, com ordenação e busca */}
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

          {professoresOrdenados.length > 0 ? (
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
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-[#043452]/70">
                {busca ? "Nenhum professor encontrado para sua busca" : "Nenhum professor encontrado"}
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}