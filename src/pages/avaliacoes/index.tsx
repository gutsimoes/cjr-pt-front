import Header from "../../components/Header-logado"
import React, { useState } from "react";

interface Comentario {
  id: number;
  autor: string;
  conteudo: string;
  data: string;
  avatarUrl?: string;
  respostas?: Comentario[];
}


interface ComentarioProps {
  comentario: Comentario;
}

function ComentarioComponent({ comentario }: ComentarioProps) {
  const [mostrarRespostas, setMostrarRespostas] = useState(false);

  const toggleRespostas = () => {
    setMostrarRespostas(!mostrarRespostas);
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 mb-4">
      <div className="flex items-start gap-3">
        <img
          src={"../default-avatar.png"}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold text-sm">{comentario.autor}</div>
              <div className="text-xs text-gray-500">{comentario.data}</div>
            </div>
          </div>

          <p className="mt-2">{comentario.conteudo}</p>

        
          <div className="flex gap-3 text-xs mt-2 text-gray-500">
  <button
    className="flex items-center gap-1 hover:text-green-600 cursor-pointer"
  >
    <img src="../messenger.png" alt="Responder" className="w-4 h-4" />
    Responder
  </button>

  <button
    className="flex items-center gap-1 hover:text-[#ffa45d] cursor-pointer"
  >
    <img src="../edit.png" alt="Editar" className="w-4 h-4" />
    Editar
  </button>

  <button
    className="flex items-center gap-1 hover:text-red-600 cursor-pointer"
  >
    <img src="../remove.png" alt="Excluir" className="w-4 h-4" />
    Excluir
  </button>
</div>

          {comentario.respostas && comentario.respostas.length > 0 && (
            <div className="mt-2">
              <button
                onClick={toggleRespostas}
                className="text-sm text-[#ffa45d] hover:underline cursor-pointer"
              >
                {mostrarRespostas
                  ? "Ocultar respostas"
                  : `Ver respostas (${comentario.respostas.length})`}
              </button>

              {mostrarRespostas && (
                <div className="mt-3 pl-5 border-l border-gray-200">
                  {comentario.respostas.map((resposta) => (
                    <ComentarioComponent key={resposta.id} comentario={resposta} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PaginaAvaliacoes() {
  const comentarios: Comentario[] = [
    {
      id: 1,
      autor: "Natielly Novais",
      conteudo: "Adorei a aula de hoje!",
      data: "02/07/2025",
      avatarUrl: "/avatar1.png",
      respostas: [
        {
          id: 2,
          autor: "Victor Silva",
          conteudo: "Também gostei bastante! Foi bem didática.",
          data: "02/07/2025",
          avatarUrl: "/avatar2.png",
        },
        {
          id: 3,
          autor: "Nicole Vasconcellos",
          conteudo: "Ela sempre é muito clara nas explicações.",
          data: "02/07/2025",
          avatarUrl: "/avatar3.png",
        },
      ],
    },
    {
      id: 4,
      autor: "Gabriel Antônio",
      conteudo: "A aula de hoje foi corrida, mas deu pra entender.",
      data: "02/07/2025",
      avatarUrl: "/avatar4.png",
    },
  ];

  return (
    <>
      <Header isLoggedIn={true} />
      <div className="max-w-3xl mx-auto px-5 py-35 py-6">
        <h1 className="text-2xl font-bold mb-5">Avaliações</h1>
        {comentarios.map((comentario) => (
          <ComentarioComponent key={comentario.id} comentario={comentario} />
        ))}
      </div>
    </>
  );
}