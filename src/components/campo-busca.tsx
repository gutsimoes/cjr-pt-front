"use client"

import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"

interface CampoBuscaProps {
  valor?: string
  onChange?: (valor: string) => void
  onBuscar?: (valor: string) => void
  placeholder?: string
}

export default function CampoBusca({
  valor,
  onChange,
  onBuscar,
  placeholder = "Buscar seu professor ideal...",
}: CampoBuscaProps) {
  const [buscaInterna, setBuscaInterna] = useState("")

  const valorBusca = valor !== undefined ? valor : buscaInterna

  const handleChange = (novoValor: string) => {
    if (onChange) {
      onChange(novoValor)
    } else {
      setBuscaInterna(novoValor)
    }
  }

  const handleBuscar = () => {
    if (onBuscar) {
      onBuscar(valorBusca)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBuscar()
    }
  }

  return (
    <div className="relative w-full max-w-3xl lg:max-w-4xl mx-auto">
      <input
        type="text"
        value={valorBusca}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
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
  )
}
