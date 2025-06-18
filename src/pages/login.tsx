'use client'

import { FiMail, FiLock } from 'react-icons/fi'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErro('')

    // Simulação de dados válidos
    const emailValido = 'ash@gmail.com'
    const senhaValida = '123'

    if (email === emailValido && senha === senhaValida) {
      const usuarioFake = {
        id: 1,
        nome: 'Ash Ketchum',
        email,
      }

      localStorage.setItem('usuario', JSON.stringify(usuarioFake))
      router.push(`/feedLogado/${usuarioFake.id}`)
    } else {
      setErro('E-mail ou senha inválidos')
    }
  }

  return (
    <main className="relative min-h-screen flex overflow-hidden font-sans bg-[#0f2606]">
      {/* Vídeo de fundo */}
      <video
        src="\fundo.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Camada escura do fundo */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Lado esquerdo */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 z-20 text-white px-10 pt-20">
        <h2 className="text-3xl font-bold drop-shadow-md mb-4 text-center">
          Não tem uma conta?
        </h2>
        <p className="text-lg mb-4 text-center">
          Cadastre-se para participar da Liga!
        </p>
        <Link
          href="/cadastro"
          className="px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[#0f2606] transition font-semibold"
        >
          Criar conta
        </Link>
      </div>

      {/* Lado direito - formulário */}
      <section className="w-full md:w-1/2 z-20 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl p-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow">
            Avaliação de
          </h1>
          <h2 className="italic text-3xl font-semibold text-white mb-6 drop-shadow">
            Professores
          </h2>

          <form onSubmit={handleLogin} className="space-y-4 text-white">
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#224953]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail..."
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white/75 text-[#1c1c1c] placeholder-[#224953] font-medium border border-[#224953] focus:outline-none focus:ring-4 focus:ring-[#224953]/40"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#224953]" />
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha..."
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white/75 text-[#1c1c1c] placeholder-[#224953] font-medium border border-[#224953] focus:outline-none focus:ring-4 focus:ring-[#224953]/40"
              />
            </div>

            {erro && <p className="text-red-400 text-sm text-center">{erro}</p>}

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="w-40 h-12 bg-[#F27F3D] text-white font-semibold rounded-full hover:bg-[#914f5f] transition duration-300 shadow-md"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
