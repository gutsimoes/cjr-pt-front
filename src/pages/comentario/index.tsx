"use client";

import Header from "../../components/Header-logado";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalEditComentario from "../../components/Edit-comentario";
import ModalExcluirComentario from "../../components/Excluir-comentario";

const api = axios.create({
  baseURL: "http://localhost:3001/comentario",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

interface Comentario {
  id: number;
  userId: number;
  avaliacaoID: number;
  conteudo: string;
  createdAt: string;
  updatedAt: string;
  user: { nome: string };
  respostas?: Comentario[];
  respostasDecomentarioId?: number;
}

/* dados criados para teste */

export const comentariosMock: Comentario[] = [
  {
    id: 1,
    userId: 1,
    avaliacaoID: 1,
    conteudo: "Ele é um ótimo professor!",
    createdAt: "2025-07-07T14:00:00.000Z",
    updatedAt: "2025-07-07T14:00:00.000Z",
    user: { nome: "Natielly Novais" },
    respostas: [
      {
        id: 2,
        userId: 2,
        avaliacaoID: 1,
        conteudo: "Ele sempre explica muito bem a matéria.",
        createdAt: "2025-07-07T15:00:00.000Z",
        updatedAt: "2025-07-07T15:00:00.000Z",
        user: { nome: "Victor Silva" },
        respostas: [],
      },
      {
        id: 3,
        userId: 3,
        avaliacaoID: 1,
        conteudo: "Também acho! Ele arredondou minha nota quando pedi.",
        createdAt: "2025-07-07T15:20:00.000Z",
        updatedAt: "2025-07-07T15:20:00.000Z",
        user: { nome: "Nicole Vasconcellos" },
        respostas: [],
      },
    ],
  },
  {
    id: 4,
    userId: 4,
    avaliacaoID: 1,
    conteudo: "Gosto dele, mas acho o ritmo dele meio acelerado.",
    createdAt: "2025-07-07T16:00:00.000Z",
    updatedAt: "2025-07-07T16:00:00.000Z",
    user: { nome: "Gabriel Antônio" },
    respostas: [],
  },
];

export default function PaginaAvaliacoes() {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [comentarioSelecionado, setComentarioSelecionado] = useState<Comentario | null>(null);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [estaLogada, setEstaLogada] = useState(false);

  const userId = 1;
  const avaliacaoID = 1;

/* código para funcionar também com dados reais */

  async function carregar() {
    const token = localStorage.getItem("token");
    setEstaLogada(!!token);

    if (token) {
      try {
        const res = await api.get(`/avaliacao/${avaliacaoID}`);
        if (res.data.length > 0) {
          setComentarios(res.data);
        } else {
          setComentarios(comentariosMock);
        }
      } catch (error) {
        console.error("Erro ao carregar do banco.");
        setComentarios(comentariosMock);
      }
    } else {
      setComentarios(comentariosMock);
    }
  }

  /* botões */

  async function excluirComentario(id: number) {
    if (estaLogada) {
      try {
        await api.delete(`/${id}`);
        await carregar();
      } catch (error) {
        console.error("Erro ao excluir comentário:", error);
      }
    } else {
      setComentarios((prev) => prev.filter((c) => c.id !== id));
    }
  }

  async function editarComentario(id: number, texto: string) {
    if (estaLogada) {
      try {
        await api.put(`/${id}`, {
          conteudo: texto,
          userId,
          avaliacaoID,
        });
        await carregar();
      } catch (error) {
        console.error("Erro ao editar comentário:", error);
      }
    } else {
      setComentarios((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, conteudo: texto, updatedAt: new Date().toISOString() } : c
        )
      );
    }
  }

  async function responderComentario(texto: string, id2: number) {
    if (estaLogada) {
      try {
        await api.post("/", {
          conteudo: texto,
          userId,
          avaliacaoID,
          respostasDecomentarioId: id2,
        });
        await carregar();
      } catch (error) {
        console.error("Erro ao responder comentário:", error);
      }
    } else {
      setComentarios((prev) =>
        prev.map((c) =>
          c.id === id2
            ? {
                ...c,
                respostas: [
                  ...(c.respostas || []),
                  {
                    id: Math.random(),
                    userId,
                    avaliacaoID,
                    conteudo: texto,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    user: { nome: "Você" },
                    respostas: [],
                  },
                ],
              }
            : c
        )
      );
    }
  }


  function abrirEditar(comentario: Comentario) {
    setComentarioSelecionado(comentario);
    setModalEditarAberto(true);
  }

  function abrirExcluir(comentario: Comentario) {
    setComentarioSelecionado(comentario);
    setModalExcluirAberto(true);
  }


  async function confirmarExclusao() {
    if (!comentarioSelecionado) return;
    await excluirComentario(comentarioSelecionado.id);
    setModalExcluirAberto(false);
    setComentarioSelecionado(null);
  }

  /* estilos dos comentários e avaliações */

  function ComentarioComponent({ comentario }: { comentario: Comentario }) {
    const [modoResponder, setModoResponder] = useState(false);
    const [respostaTexto, setRespostaTexto] = useState("");
    const isMeu = comentario.userId === userId;

    return (
      <div className="bg-white shadow rounded-xl p-4 mb-4">
        <div className="flex items-start gap-3">
          <img
            src="/default-avatar.png"
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-sm">{comentario.user?.nome}</div>
                <div className="text-xs text-gray-500">
                  {new Date(comentario.createdAt).toLocaleString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>

            <p className="mt-2 text-sm">{comentario.conteudo}</p>

            <div className="flex gap-3 text-xs mt-3 text-gray-500">
              <button
                className="flex items-center gap-1 hover:text-[#ffa45d]"
                onClick={() => setModoResponder(!modoResponder)}
              >
                <img src="/messenger.png" className="w-4 h-4" />
                Responder
              </button>

              {isMeu && (
                <>
                  <button
                    className="flex items-center gap-1 hover:text-[#ffa45d]"
                    onClick={() => abrirEditar(comentario)}
                  >
                    <img src="/edit.png" className="w-4 h-4" />
                    Editar
                  </button>

                  <button
                    className="flex items-center gap-1 hover:text-[#ffa45d]"
                    onClick={() => abrirExcluir(comentario)}
                  >
                    <img src="/remove.png" className="w-4 h-4" />
                    Excluir
                  </button>
                </>
              )}
            </div>

            {modoResponder && (
              <div className="mt-2">
                <textarea
                  value={respostaTexto}
                  onChange={(e) => setRespostaTexto(e.target.value)}
                  placeholder="Digite a resposta..."
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={() => responderComentario(respostaTexto, comentario.id)}
                  className="px-4 py-1 rounded-full bg-[#ffa45d] text-white hover:bg-[#ff8a30]"
                >
                  Enviar
                </button>
              </div>
            )}

            {comentario.respostas && comentario.respostas.length > 0 && (
              <div className="mt-4 ml-6 pl-6 border-l-2 border-gray-200">
                {comentario.respostas.map((r) => (
                  <ComentarioComponent key={r.id} comentario={r} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    carregar();
  }, []);

  /* implentação do header e dos modais */
  return (
    <>
      <Header />
<button
  onClick={() => (window.location.href = `/perfil/${id}`)}
  className="fixed left-4 cursor-pointer z-50"
  style={{ width: 50, height: 50, top: 120 }}
>
  <img src="back.png" alt="Botão de voltar" className="w-full h-full object-contain" />
</button>
      <ModalEditComentario
        isOpen={modalEditarAberto}
        textoAtual={comentarioSelecionado?.conteudo || ""}
        onClose={() => setModalEditarAberto(false)}
        onSave={async (texto) => {
          if (comentarioSelecionado) {
            await editarComentario(comentarioSelecionado.id, texto);
            setModalEditarAberto(false);
            setComentarioSelecionado(null);
          }
        }}
      />
      
      <ModalExcluirComentario
        isOpen={modalExcluirAberto}
        onClose={() => setModalExcluirAberto(false)}
        onConfirm={confirmarExclusao}
      />

      <div className="max-w-3xl mx-auto px-2 py-30">
        <h1 className="text-2xl font-bold mb-5">Avaliações:</h1>
        {comentarios.length === 0 ? (
          <p className="text-gray-500">Nenhum comentário ainda.</p>
        ) : (
          comentarios.map((c) => <ComentarioComponent key={c.id} comentario={c} />)
        )}
      </div>
    </>
  );
}
