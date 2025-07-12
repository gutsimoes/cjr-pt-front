"use client"

import { useEffect, useState } from "react"

interface ModalProps {
    isOpen?: boolean
    onClose: () => void
}

interface Disciplina {
    id: number
    nome: string
}

export function ModalProfessor({ isOpen = false, onClose }: ModalProps) {
    const [nome, setNome] = useState("")
    const [departamento, setDepartamento] = useState("")
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([])
    const [disciplinaId, setDisciplinaId] = useState("")
    const [novaDisciplina, setNovaDisciplina] = useState("")
    const [criarNova, setCriarNova] = useState(false)

    useEffect(() => {
        if (isOpen) {
            fetch("http://localhost:3001/disciplina", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then(res => res.json())
                .then(setDisciplinas)
        }
    }, [isOpen])

    const enviar = async () => {
        const token = localStorage.getItem("token")
        if (!token || !nome || !departamento || (criarNova && !novaDisciplina) || (!criarNova && !disciplinaId)) {
            alert("Preencha todos os campos.")
            return
        }

        let idDisciplina = Number(disciplinaId)

        if (criarNova) {
            const res = await fetch("http://localhost:3001/disciplina", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome: novaDisciplina }),
            })

            const nova = await res.json()
            idDisciplina = nova.id
        }

        await fetch("http://localhost:3001/professor", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome,
                departamento,
                disciplinaID: idDisciplina,
            }),
        })

        alert("Professor criado com sucesso!")
        fechar()
    }

    const fechar = () => {
        setNome("")
        setDepartamento("")
        setDisciplinaId("")
        setNovaDisciplina("")
        setCriarNova(false)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-md" onClick={fechar}></div>
            <div className="relative rounded-3xl p-8 w-full max-w-lg shadow-2xl bg-white">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Adicionar Novo Professor</h2>

                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome do Professor"
                    className="w-full mb-4 p-3 rounded-xl border border-gray-300"
                />

                <input
                    type="text"
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                    placeholder="Departamento"
                    className="w-full mb-6 p-3 rounded-xl border border-gray-300"
                />

                <div className="flex gap-4 mb-4">
                    <label>
                        <input
                            type="radio"
                            checked={!criarNova}
                            onChange={() => setCriarNova(false)}
                            className="mr-2"
                        />
                        Disciplina existente
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={criarNova}
                            onChange={() => setCriarNova(true)}
                            className="mr-2"
                        />
                        Nova disciplina
                    </label>
                </div>

                {!criarNova ? (
                    <select
                        value={disciplinaId}
                        onChange={(e) => setDisciplinaId(e.target.value)}
                        className="w-full mb-6 p-3 rounded-xl border border-gray-300"
                    >
                        <option value="">Selecione uma disciplina</option>
                        {disciplinas.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.nome}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="text"
                        value={novaDisciplina}
                        onChange={(e) => setNovaDisciplina(e.target.value)}
                        placeholder="Nome da nova disciplina"
                        className="w-full mb-6 p-3 rounded-xl border border-gray-300"
                    />
                )}

                <div className="flex gap-4">
                    <button onClick={fechar} className="flex-1 py-3 rounded-xl bg-gray-700 text-white">
                        Cancelar
                    </button>
                    <button onClick={enviar} className="flex-1 py-3 rounded-xl bg-[#ffa45d] text-white">
                        Criar
                    </button>
                </div>
            </div>
        </div>
    )
}