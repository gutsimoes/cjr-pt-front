"use client"
import Link from "next/link"

interface ProfessorCardProps {
  id: number
  nome: string
  disciplina: string
  imagem: string | null
}

export default function ProfessorCard({ id, nome, disciplina, imagem }: ProfessorCardProps) {
  if (!nome || !disciplina) {
    console.warn("ProfessorCard: Missing required props", { nome, disciplina })
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600 text-sm">Dados do professor incompletos</p>
      </div>
    )
  }

  return (
    <div className="group relative bg-gradient-to-b from-white/80 via-white/70 to-white/60 backdrop-blur-2xl rounded-3xl p-6 border-4 border-white/90 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:transform hover:scale-105 overflow-hidden hover:border-[#ffa45d]/60 hover:from-white/90 hover:via-white/80 hover:to-white/70">
      {/* Borda interna dourada estilo Pokémon */}
      <div className="absolute inset-2 rounded-2xl border-2 border-gradient-to-r from-[#ffa45d]/30 via-amber-400/40 to-[#ffa45d]/30 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Efeito holográfico */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffa45d]/10 via-transparent to-[#043452]/10 rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
      {/* Cantos estilo carta */}
      <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-[#ffa45d]/40 rounded-tl-lg" />
      <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-[#ffa45d]/40 rounded-tr-lg" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-[#ffa45d]/40 rounded-bl-lg" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-[#ffa45d]/40 rounded-br-lg" />
      {/* Avatar central estilo Pokémon */}
      <div className="relative mb-6 mt-4">
        <div className="w-32 h-32 mx-auto relative">
          {/* Círculo de fundo estilo carta */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full shadow-inner" />
          {imagem ? (
            <img
              src={imagem || "/placeholder.svg"}
              alt={`Foto de ${nome}`}
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl relative z-10 group-hover:border-[#ffa45d]/60 transition-colors duration-300"
              onError={(e) => {
                // Hide image if it fails to load and show fallback
                e.currentTarget.style.display = "none"
                const fallback = e.currentTarget.nextElementSibling as HTMLElement
                if (fallback) fallback.style.display = "flex"
              }}
            />
          ) : null}
          {/* Fallback avatar */}
          <div
            className={`w-full h-full rounded-full bg-gradient-to-br from-[#043452] to-[#043452]/80 border-4 border-white shadow-xl flex items-center justify-center relative z-10 group-hover:border-[#ffa45d]/60 transition-colors duration-300 ${imagem ? "hidden" : "flex"}`}
          >
            <span className="text-4xl font-bold text-white">{nome.charAt(0).toUpperCase()}</span>
          </div>
          {/* Brilho estilo holográfico */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      {/* Nome do professor estilo carta */}
      <div className="text-center mb-4">
        <h3 className="text-2xl font-extrabold text-[#043452] group-hover:text-[#ffa45d] transition-colors duration-300 drop-shadow-sm">
          {String(nome)}
        </h3>
        <p className="text-[#043452]/80 text-lg font-semibold mt-2 group-hover:text-[#043452] transition-colors duration-300">
          {disciplina}
        </p>
      </div>
      {/* Link estilo botão */}
      <div className="flex justify-center mt-6">
        <Link
          href={`/professor/${id}`}
          className="w-full h-[45px] bg-gradient-to-r from-[#ffa45d] to-amber-500 text-white font-bold rounded-2xl hover:from-[#ff9a47] hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white/50 hover:border-white/70 relative overflow-hidden flex items-center justify-center"
        >
          <span className="relative z-10">Ver Perfil</span>
          {/* Efeito de brilho no botão */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </Link>
      </div>
    </div>
  )
}
