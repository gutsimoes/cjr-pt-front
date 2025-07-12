"use client";

import React from "react";

interface ModalExcluirComentarioProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ModalExcluirComentario({
  isOpen,
  onClose,
  onConfirm,
}: ModalExcluirComentarioProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-[#ff7f50]">Excluir Comentário</h2>
        <p className="mb-4 text-sm text-gray-700">
          Tem certeza que deseja excluir este comentário? 
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1 rounded-full bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1 rounded-full bg-[#ffa45d] text-white hover:bg-[#ff8a30]"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
