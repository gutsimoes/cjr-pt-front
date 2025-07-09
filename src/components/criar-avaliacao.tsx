import { useEffect, useState } from "react";
import axios from "axios";

interface ModalCriarAvaliacaoProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: number;
  disciplinaId: number;
}

interface Professor {
  id: number;
  nome: string;
}

export default function ModalCriarAvaliacao({
  isOpen,
  onClose,
  onSuccess,
  userId,
  disciplinaId
}: ModalCriarAvaliacaoProps) {
  const [professorId, setProfessorId] = useState<number>(0);
  const [comentario, setComentario] = useState<string>("");
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:3001/professor", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setProfessores(res.data);
        })
        .catch(err => {
          console.error("Erro ao buscar professores:", err);
        });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:3001/avaliacao",
        {
          userId: userId,
          professorID: professorId,
          disciplinaID: disciplinaId,
          conteudo: comentario,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      onSuccess();
    } catch (err) {
      console.error("Erro ao criar avaliação:", err);
      alert("Erro ao criar avaliação");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl w-full max-w-lg shadow-xl">
        <h2 className="text-2xl font-bold text-[#043452] mb-6 text-center">Criar Avaliação</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-700">Selecione um Professor:</label>
            <select
              value={professorId}
              onChange={(e) => setProfessorId(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800"
              required
            >
              <option value="">-- Escolha um professor --</option>
              {professores.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-700">Comentário:</label>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none text-gray-800"
              placeholder="Escreva sua avaliação aqui..."
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Enviando..." : "Enviar Avaliação"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
