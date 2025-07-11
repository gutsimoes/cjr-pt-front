"use client"

import { useState } from "react"

// Tipos de ordenação válidos
type Ordenacao = "nome" | "disciplina" | "id" | "mais_antigo"

// Props do componente
interface BotaoOrdenarProps {
  ordenacao?: Ordenacao
  onChange?: (ordenacao: Ordenacao) => void
}

export default function BotaoOrdenar({ ordenacao, onChange }: BotaoOrdenarProps) {
  const [ordenacaoInterna, setOrdenacaoInterna] = useState<Ordenacao>("nome")

  const valorOrdenacao = ordenacao ?? ordenacaoInterna

  // Ordem de rotação
  const ordem: Ordenacao[] = ["nome", "disciplina", "id", "mais_antigo"]

  const rotulos: Record<Ordenacao, string> = {
    nome: "Nome",
    disciplina: "Disciplina",
    id: "Mais Recente",
    mais_antigo: "Mais Antigo",
  }

  function trocarOrdenacao() {
    const posAtual = ordem.indexOf(valorOrdenacao)
    const novaOrdenacao = ordem[(posAtual + 1) % ordem.length]
    onChange ? onChange(novaOrdenacao) : setOrdenacaoInterna(novaOrdenacao)
  }

  return (
    <button
      onClick={trocarOrdenacao}
      className="flex items-center gap-4 px-10 py-4 rounded-3xl bg-[#043452]/20 backdrop-blur-sm text-[#043452] hover:bg-[#043452]/30 transition-all duration-300 font-bold border-2 border-[#043452]/30 shadow-lg hover:shadow-xl text-lg hover:scale-105"
      type="button"
    >
      <span>Ordenar por {rotulos[valorOrdenacao]}</span>
      <div className="w-2 h-2 bg-[#043452] rounded-full"></div>
    </button>
  )
}
