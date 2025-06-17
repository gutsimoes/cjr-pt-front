'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiUser, FiMail, FiLock, FiBookOpen, FiHome } from 'react-icons/fi'
import Image from 'next/image'

export default function CadastroPage() {
  const [foto, setFoto] = useState<string | null>(null)

  const handleImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setFoto(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="relative min-h-screen flex overflow-hidden font-sans bg-[#0f2606]">
      {/* Vídeo de fundo */}
      <video
        src="/fundo2.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Camada escura */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Lado esquerdo */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 z-20 text-white px-10">
        <h2 className="text-3xl font-bold drop-shadow-md mb-4 text-center">
          Já tem uma conta?
        </h2>
        <p className="text-lg mb-4 text-center">
          Entre para continuar explorando a Liga!
        </p>
        <Link href="/login" passHref legacyBehavior>
          <a className="px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[#0f2606] transition font-semibold">
            Fazer login
          </a>
        </Link>
      </div>

      {/* Formulário */}
      <div className="relative z-20 flex w-full md:w-1/2 h-screen items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl shadow-lg p-10">
          <h1 className="text-4xl font-extrabold text-white text-center mb-2 drop-shadow-lg">
            Seja Bem-Vindo!
          </h1>
          <h2 className="text-2xl font-semibold text-white text-center mb-6 drop-shadow-md">
            Liga dos Avaliadores
          </h2>

          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <label htmlFor="foto-perfil" className="cursor-pointer group" aria-label="Selecionar foto de perfil">
              <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-[#6B732F] shadow-md bg-white/70 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={foto ?? "/default-avatar.png"}
                  alt="Foto de perfil"
                  fill
                  className="object-cover"
                />
              </div>
            </label>
            <input
              id="foto-perfil"
              type="file"
              accept="image/*"
              onChange={handleImagem}
              className="hidden"
            />
          </div>

          {/* Inputs */}
          <form className="space-y-5 text-[#9ba796]">
            {[
              { icon: FiUser, placeholder: 'Seu nome', type: 'text' },
              { icon: FiMail, placeholder: 'Seu email', type: 'email' },
              { icon: FiLock, placeholder: 'Crie uma senha', type: 'password' },
              { icon: FiBookOpen, placeholder: 'Seu curso', type: 'text' },
              { icon: FiHome, placeholder: 'Seu departamento', type: 'text' },
            ].map(({ icon: Icon, placeholder, type }, idx) => (
              <div key={idx} className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B732F]" />
                <input
                  type={type}
                  placeholder={placeholder}
                  className="w-full pl-10 pr-4 py-3 rounded-full bg-white/75 text-[#1c1c1c] placeholder-[#5f6b38] font-medium border border-gray-300 focus:outline-none focus:ring-4 focus:ring-[#BB7C4E]/60"
                />
              </div>
            ))}

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="w-[200px] h-[50px] bg-[#BB7C4E] text-white font-semibold rounded-full hover:bg-[#a5643b] transition duration-300 shadow-md"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
