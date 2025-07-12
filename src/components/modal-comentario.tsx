"use client"

import { useEffect, useState } from "react"

interface ModalProps {
    isOpen?: boolean
    onClose: () => void
}

export function ModalComentario({ isOpen = false, onClose }: ModalProps) {
    const [professores, setProfessores] = useState<any[]>([])
    const [professorId, setProfessorId] = useState("")
    const [disciplina, setDisciplina] = useState<any>(null)
    const [comentario, setComentario] = useState("")

    useEffect(() => {
        if (isOpen) {
            fetch("http://localhost:3001/professor")
                .then(res => res.json())
                .then(setProfessores)
        }
    }, [isOpen])

    useEffect(() => {
        if (professorId) {
            fetch(`http://localhost:3001/professor/${professorId}`)
                .then(res => res.json())
                .then(prof => {
                    if (prof.disciplinaID) {
                        fetch(`http://localhost:3001/disciplina/${prof.disciplinaID}`)
                            .then(res => res.json())
                            .then(setDisciplina)
                    }
                })
        } else {
            setDisciplina(null)
        }
    }, [professorId])

    const enviar = () => {
        const token = localStorage.getItem("token")
        if (!token || !professorId || !disciplina || !comentario) {
            alert("Preencha todos os campos.")
            return
        }

        const payload = JSON.parse(atob(token.split(".")[1]))
        const userId = payload?.sub

        const avaliacao = {
            userId,
            professorID: Number(professorId),
            disciplinaID: Number(disciplina.id),
            conteudo: comentario,
        }

        fetch("http://localhost:3001/avaliacao", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(avaliacao),
        })
            .then(res => res.json())
            .then((avaliacaoCriada) => {
                const comentarioData = {
                    userId,
                    avaliacaoID: avaliacaoCriada.id,
                    conteudo: comentario,
                }

                return fetch("http://localhost:3001/comentario", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(comentarioData),
                })
            })
            .then(() => {
                alert("Avaliação enviada!")
                fechar()
            })
    }

    const fechar = () => {
        setProfessorId("")
        setDisciplina(null)
        setComentario("")
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-md" onClick={fechar}></div>
            <div className="relative p-8 w-full max-w-lg rounded-3xl shadow-2xl bg-white">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Avaliar Professor</h2>

                <select
                    value={professorId}
                    onChange={(e) => setProfessorId(e.target.value)}
                    className="w-full p-3 mb-4 rounded-xl border border-gray-300"
                >
                    <option value="">Selecione um professor</option>
                    {professores.map((prof) => (
                        <option key={prof.id} value={prof.id}>
                            {prof.nome} - {prof.departamento}
                        </option>
                    ))}
                </select>

                <div className="mb-4 p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700">
                    {disciplina ? disciplina.nome : "Disciplina"}
                </div>

                <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Digite sua avaliação..."
                    className="w-full h-32 p-4 mb-6 rounded-xl border border-gray-300 resize-none"
                />

                <div className="flex gap-4">
                    <button onClick={fechar} className="flex-1 py-3 rounded-xl bg-gray-700 text-white">Cancelar</button>
                    <button onClick={enviar} className="flex-1 py-3 rounded-xl bg-[#ffa45d] text-white">Avaliar</button>
                </div>
            </div>
        </div>
    )
}