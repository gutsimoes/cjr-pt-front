"use client"

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ArrowLeft, MessageCircle } from "lucide-react"
import axios from "axios"
import Header from "../../components/header"

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

interface User {
    id: number
    nome: string
    email?: string
}

interface Avaliacao {
    id: number
    conteudo: string
    createdAt: string
    userId: string
    professorID: string
}

export default function PerfilProfessor() {
    const router = useRouter()
    const { id } = router.query

    const [professor, setProfessor] = useState<Professor | null>(null)
    const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([])
    const [usuarios, setUsuarios] = useState<any>({})
    const [usuario, setUsuario] = useState<User | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (!router.isReady || !id) return

        const token = localStorage.getItem("token")
        const payload = token ? decodeJwtPayload(token) : null

        if (token && payload?.sub) {
            setIsLoggedIn(true)
            axios.get(`http://localhost:3001/user/${payload.sub}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((res) => setUsuario(res.data))
        }

        axios.get(`http://localhost:3001/professor/${id}`).then((res) => {
            setProfessor(res.data)
        })

        axios.get(`http://localhost:3001/avaliacao/professor/${id}`).then(async (res) => {
            const avals = res.data.avaliacoes || res.data || []
            setAvaliacoes(avals)

            const cache: any = {}
            for (const a of avals) {
                if (!cache[a.userId]) {
                    const user = await axios.get(`http://localhost:3001/user/public/${a.userId}`).then(r => r.data)
                    cache[a.userId] = user
                }
            }
            setUsuarios(cache)
        })
    }, [router.isReady, id])

    function decodeJwtPayload(token: string): any {
        try {
            return JSON.parse(atob(token.split(".")[1]))
        } catch {
            return null
        }
    }

    const voltar = () => router.back()
    const voltarParaFeed = () => router.push(isLoggedIn ? "/feed-logado" : "/feed-deslogado")
    const irParaAvaliacoes = () => router.push("/avaliacoes")
    const formatarData = (data: string) => new Date(data).toLocaleDateString("pt-BR")

    const obterNomeUsuario = (avaliacao: Avaliacao) => {
        const user = usuarios[avaliacao.userId]
        return user?.nome || `Usuário ${avaliacao.userId}`
    }

    const getAvatarColor = (nome: string) => {
        const cores = ["bg-orange-300", "bg-sky-900", "bg-amber-100"]
        return cores[nome.length % cores.length]
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        setUsuario(null)
        router.push("/")
    }

    if (!professor) {
        return (
            <div style={{ minHeight: "100vh", backgroundColor: "#fff8ed", padding: "20px" }}>
                <p style={{ textAlign: "center", marginTop: "100px", color: "red" }}>Professor não encontrado</p>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                        onClick={voltar}
                        className="bg-orange-400 text-white px-4 py-2 rounded"
                    >
                        Voltar
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#fff8ed" }}>
            <Header userName={usuario?.nome} onLogout={handleLogout} />
            <main className="flex flex-col items-center mt-6 px-4">
                {/* Botões topo */}
                <div className="w-full max-w-[800px] flex gap-3 mb-6">
                    <button
                        onClick={voltar}
                        className="p-2 bg-white rounded-full border hover:bg-gray-100"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <button
                        onClick={voltarParaFeed}
                        className="bg-orange-400 text-white px-4 py-2 rounded font-semibold hover:opacity-90"
                    >
                        Voltar ao Feed
                    </button>
                </div>

                {/* Info professor */}
                <div className="bg-white rounded-xl shadow-md p-6 max-w-[800px] w-full mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-[#043452] text-white rounded-full flex items-center justify-center text-3xl font-bold">
                            {professor.nome.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#043452]">Prof. {professor.nome}</h1>
                            <p className="text-gray-600 mt-1">🏢 Departamento: {professor.departamento}</p>
                            <p className="text-gray-600">📚 Disciplina: {professor.disciplina?.nome}</p>
                        </div>
                    </div>
                </div>

                {/* Avaliações  */}
                <div className="w-full max-w-[800px] bg-white rounded-2xl p-6 shadow-md">
                    <h2 className="text-xl font-bold text-[#043452] mb-4">Avaliações ({avaliacoes.length})</h2>
                    {avaliacoes.length > 0 ? (
                        avaliacoes.map((a) => (
                            <div
                                key={a.id}
                                className="bg-[#fffaf4] border border-orange-100 rounded-2xl p-4 mb-5 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${getAvatarColor(obterNomeUsuario(a))}`}>
                                        <span className="text-white font-bold text-base">
                                            {obterNomeUsuario(a).charAt(0).toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <div>
                                                <span className="font-semibold text-[#333] text-sm">{obterNomeUsuario(a)}</span>
                                                <p className="text-xs text-gray-400">{formatarData(a.createdAt)}</p>
                                                {a.conteudo}
                                            </div>
                                        </div>


                                        <div className="flex gap-3 text-xs mt-2 text-gray-500">
                                            <button
                                                onClick={irParaAvaliacoes}
                                                className="flex items-center gap-1 hover:text-gray-700 transition"
                                            >
                                                <MessageCircle className="w-3 h-3" />
                                                comentários
                                            </button>
                                            {isLoggedIn && String(usuario?.id) === String(a.userId) && (
                                                <>
                                                    <button className="flex items-center gap-1 hover:text-orange-500 transition">
                                                        <img src="../edit.png" alt="Editar" className="w-4 h-4" />
                                                        Editar
                                                    </button>
                                                    <button className="flex items-center gap-1 hover:text-red-500 transition">
                                                        <img src="../remove.png" alt="Excluir" className="w-4 h-4" />
                                                        Excluir
                                                    </button>

                                                </>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>Nenhuma avaliação encontrada para este professor</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
