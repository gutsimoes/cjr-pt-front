'use client';

import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-100 font-sans">
      <header className="bg-teal-500 flex justify-between items-center px-6 py-4">
      <div className="w-30 h-30">
  <img
    src="/logopokemon.png"
    alt="Logo"
    className="w-full h-full object-contain"
  />
</div>
        <button className="bg-teal-700 hover:bg-teal-600 text-white font-semibold py-2 px-10 rounded shadow-lg cursor-pointer">
          Login
        </button>
      </header>

      <main className="px-6 py-10 space-y-10">
        <section>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h2 className="text-2xl font-semibold">Novos Professores</h2>
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Buscar Professor(a)"
                className="bg-white w-full pl-10 pr-12 py-3 rounded-2xl shadow-lg text-gray-700"
              />
              <svg
                className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <img
                src="/image.png"
                alt="Foto de perfil do professor"
                className="mx-auto w-24 h-24 rounded-full mb-2 object-cover"
              />
              <h3 className="font-bold text-lg">Professor Carvalho</h3>
              <p className="text-sm text-gray-500">Segurança Computacional</p>
            </div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 text-center">
                <div className="w-24 h-24 bg-teal-700 rounded-full mx-auto mb-2"></div>
                <h3 className="font-bold text-lg">Nome</h3>
                <p className="text-sm text-gray-500">Disciplina</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-black" />

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Todos os Professores</h2>
            <button className="bg-teal-700 hover:bg-teal-600 text-white font-semibold py-2 px-10 rounded shadow-lg cursor-pointer">
              Ordenar
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 text-center">
                <div className="w-24 h-24 bg-teal-700 rounded-full mx-auto mb-2"></div>
                <h3 className="font-bold text-lg">Nome</h3>
                <p className="text-sm text-gray-500">Disciplina</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
