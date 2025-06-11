'use client';

import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen bg-transparent">
      <div className="bg-transparent w-1/2 flex justify-center items-center relative overflow-hidden">
        <Image
          src="/image.png"
          alt="Imagem de uma mulher usando um notebook"
          width={400}
          height={400}
          className="bg-transparent object-contain"
        />
      </div>

      <section className="w-1/2 flex flex-col justify-center items-center gap-6 bg-white shadow-md rounded-lg p-8">
        <div className="text-center">
          <h1 className="text-5xl font-semibold text-indigo-950">
            Avaliação de
          </h1>
          <h1 className="italic text-5xl font-semi text-indigo-950">
            professores
          </h1>
        </div>

        <input
          type="text"
          id="e-mail"
          placeholder="Digite seu e-mail..."
          className="shadow w-80 p-3 border border-gray-300 bg-indigo-200 rounded-2xl focus:ring-indigo-500 focus:border-indigo-500 hover:bg-indigo-300"
        />
        <input
          type="password"
          id="senha"
          placeholder="Digite sua senha..."
          className="shadow w-80 p-3 border border-gray-300 bg-indigo-200 rounded-2xl focus:ring-indigo-500 focus:border-indigo-500 hover:bg-indigo-300"
        />

        <div className="flex gap-2 mt-4">
          <button className="w-40 h-12 bg-teal-400 text-indigo-950 rounded-2xl hover:bg-teal-500">
            Entrar
          </button>
          <button className="w-40 h-12 bg-teal-400 text-indigo-950 rounded-2xl hover:bg-teal-500">
            Criar conta
          </button>
        </div>
      </section>
    </main>
  );
}

