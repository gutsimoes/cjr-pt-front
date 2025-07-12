"use client";

import React, { useEffect, useState } from "react";

interface ModalEditComentarioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (novoTexto: string) => void;
  textoAtual: string;
}

const ModalEditComentario: React.FC<ModalEditComentarioProps> = ({
  isOpen,
  onClose,
  onSave,
  textoAtual,
}) => {
  const [texto, setTexto] = useState(textoAtual);

  useEffect(() => {
    setTexto(textoAtual);
  }, [textoAtual]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Editar Comentário</h2>
        <textarea
          className="w-full border rounded p-2 mb-4"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-3 py-1 rounded-full hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(texto)}
            className="px-4 py-1 rounded-full bg-[#ffa45d] text-white hover:bg-[#ff8a30]"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditComentario;
