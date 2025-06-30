"use client"

import { useState } from "react"

interface BotaoOrdenarProps {
  ordenacao?: string
  onChange?: (ordenacao: string) => void
}

export default function BotaoOrdenar({ ordenacao, onChange }: BotaoOrdenarProps) {
  const [ordenacaoInterna, setOrdenacaoInterna] = useState("nome")

  // Use ordenacao externa se fornecida, senão use estado interno
  const valorOrdenacao = ordenacao !== undefined ? ordenacao : ordenacaoInterna

  function trocarOrdenacao() {
    const novaOrdenacao = valorOrdenacao === "nome" ? "disciplina" : valorOrdenacao === "disciplina" ? "id" : "nome"

    if (onChange) {
      onChange(novaOrdenacao)
    } else {
      setOrdenacaoInterna(novaOrdenacao)
    }
  }

  const getTextoOrdenacao = (tipo: string) => {
    switch (tipo) {
      case "nome":
        return "Nome"
      case "disciplina":
        return "Disciplina"
      case "id":
        return "Mais Recente"
      default:
        return "Nome"
    }
  }

  return (
    <button
      onClick={trocarOrdenacao}
      className="flex items-center gap-4 px-10 py-4 rounded-3xl bg-[#043452]/20 backdrop-blur-sm text-[#043452] hover:bg-[#043452]/30 transition-all duration-300 font-bold border-2 border-[#043452]/30 shadow-lg hover:shadow-xl text-lg hover:scale-105"
      type="button"
    >
      <span>Ordenar por {getTextoOrdenacao(valorOrdenacao)}</span>
      <div className="w-2 h-2 bg-[#043452] rounded-full"></div>
    </button>
  )
}
