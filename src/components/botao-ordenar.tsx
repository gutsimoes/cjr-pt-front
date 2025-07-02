"use client"

import { useState } from "react"


//props componente
interface BotaoOrdenarProps {
  ordenacao?: string
  onChange?: (ordenacao: string) => void
}

//Começa em "nome".
export default function BotaoOrdenar({ ordenacao, onChange }: BotaoOrdenarProps) {
  const [ordenacaoInterna, setOrdenacaoInterna] = useState("nome")

  // se pedir ordenação ele ordena se não o componente se autogerencia
  const valorOrdenacao = ordenacao !== undefined ? ordenacao : ordenacaoInterna


  const ordem: Ordenacao[] = ["nome", "disciplina", "id"]

  function trocarOrdenacao() {
    const posAtual = ordem.indexOf(valorOrdenacao as Ordenacao)
    const novaOrdenacao = ordem[(posAtual + 1) % ordem.length] // avança e volta ao início
    onChange ? onChange(novaOrdenacao) : setOrdenacaoInterna(novaOrdenacao)
  }


  // retorna qual ordenação vai ser feita
  type Ordenacao = "nome" | "disciplina" | "id" //existem três strings válidas aqui

  const rotulos: Record<Ordenacao, string> = { //chave de valores string
    nome: "Nome",
    disciplina: "Disciplina",
    id: "Mais Recente",
  }

  const getTextoOrdenacao = (tipo: Ordenacao) => rotulos[tipo] // qual rotulo vai retornar


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
