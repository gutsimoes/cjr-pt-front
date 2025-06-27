"use client"

import Header from "../../components/Header-deslogado"
import ProfessorCard from "../../components/ProfessorCard"

export default function FeedDeslogado() {
  const professoresNovos = [
    { id: 1, nome: "Ana Souza", disciplina: "Matemática", imagem: null },
    { id: 2, nome: "Carlos Lima", disciplina: "História", imagem: null },
    { id: 3, nome: "Beatriz Ramos", disciplina: "Química", imagem: null },
    { id: 4, nome: "Lucas Ferreira", disciplina: "Física", imagem: null },
  ]

  const todosProfessores = [
    ...professoresNovos,
    { id: 5, nome: "João Pedro", disciplina: "Biologia", imagem: null },
    { id: 6, nome: "Marina Costa", disciplina: "Português", imagem: null },
    { id: 7, nome: "Rafael Martins", disciplina: "Inglês", imagem: null },
    { id: 8, nome: "Sofia Almeida", disciplina: "Geografia", imagem: null },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden font-sans text-[#043452]">
      <div className="absolute top-16 left-12 w-80 h-80 bg-[#ffa45d]/25 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-24 right-12 w-96 h-96 bg-[#043452]/15 rounded-full blur-3xl opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl" />

      {/* Header */}
      <Header />

      <main className="relative z-10 pt-32 px-6 pb-24 max-w-7xl mx-auto space-y-32">
        <section className="text-center max-w-4xl mx-auto group">
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-8 tracking-tight">
            Encontre os
            <br />
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

        {/* Novos Professores */}
        <section className="bg-white/40 backdrop-blur-2xl rounded-3xl p-12 border-2 border-white/60 shadow-2xl relative overflow-hidden">
          {/* Efeito de destaque no bloco */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ffa45d]/5 via-transparent to-[#043452]/5 rounded-3xl" />
          <div className="absolute -top-2 -left-2 w-20 h-20 bg-[#ffa45d]/20 rounded-full blur-xl" />
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-[#043452]/20 rounded-full blur-lg" />

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16 gap-8">
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#ffa45d] to-amber-500 rounded-full" />
                <h2 className="text-5xl font-extrabold mb-4 text-[#043452]">Novos Professores</h2>
                <p className="text-[#043452]/75 text-xl font-medium max-w-md">
                  Conheça os novos talentos que estão sendo julgados
                </p>
              </div>

              <div className="relative w-full lg:w-96">
                <input
                  type="text"
                  placeholder="Buscar seu professor ideal..."
                  className="w-full rounded-3xl border-2 border-[#ffa45d]/30 bg-white/50 backdrop-blur-md px-8 py-5 text-[#043452] placeholder-[#043452]/70 focus:outline-none focus:ring-4 focus:ring-[#ffa45d]/40 focus:border-[#ffa45d] transition-all duration-300 shadow-lg text-lg"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#ffa45d]/20 rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {professoresNovos.map((prof) => (
                <ProfessorCard key={prof.id} {...prof} />
              ))}
            </div>
          </div>
        </section>

        {/* Todos os Professores */}
        <section className="bg-white/40 backdrop-blur-2xl rounded-3xl p-12 border-2 border-white/60 shadow-2xl relative overflow-hidden">
          {/* Efeito de destaque no bloco */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#043452]/5 via-transparent to-[#ffa45d]/5 rounded-3xl" />
          <div className="absolute -top-2 -right-2 w-24 h-24 bg-[#043452]/15 rounded-full blur-xl" />
          <div className="absolute -bottom-2 -left-2 w-18 h-18 bg-[#ffa45d]/15 rounded-full blur-lg" />

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16 gap-8">
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#043452] to-[#043452]/70 rounded-full" />
                <h2 className="text-5xl font-extrabold mb-4 text-[#043452]">Todos os Professores</h2>
                <p className="text-[#043452]/75 text-xl font-medium max-w-md">
                  Explore nossa comunidade completa de educadores
                </p>
              </div>

              <button
                className="flex items-center gap-4 px-10 py-4 rounded-3xl bg-[#043452]/20 backdrop-blur-sm text-[#043452] hover:bg-[#043452]/30 transition-all duration-300 font-bold border-2 border-[#043452]/30 shadow-lg hover:shadow-xl text-lg hover:scale-105"
                type="button"
              >
                <span>Ordenar</span>
                <div className="w-2 h-2 bg-[#043452] rounded-full" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {todosProfessores.map((prof) => (
                <ProfessorCard key={prof.id} {...prof} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}