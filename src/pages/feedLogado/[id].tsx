'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function decodeJwtPayload(token: string): any {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

interface Usuario {
  id: string;
  nome: string;
  email: string;
}

export default function FeedLogado() {
  const router = useRouter();
  const { id } = router.query;
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const payload = token ? decodeJwtPayload(token) : null;

    if (!token || (id && String(payload?.sub) !== String(id))) {
      router.replace('/login');
      return;
    }

    if (id) {
      fetch(`http://localhost:3001/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          if (res.status === 401) {
            router.replace('/login');
            return;
          }

          const data = await res.json();
          setUsuario(data);
        })
        .catch(() => {
          router.replace('/login');
        });
    }
  }, [id, router]);

  const irParaPerfil = () => {
    if (usuario?.id) {
      router.push(`/perfilLogado/${usuario.id}`);
    }
  };

  if (!usuario) {
    return <p className="text-white text-center mt-10">Carregando usuário...</p>;
  }

  return (
    <main className="min-h-screen bg-[#0f2606] text-white flex flex-col items-center justify-center font-sans p-4">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Feed, {usuario.nome}!</h1>
      <p className="text-lg">Email: {usuario.email}</p>
      <p className="text-md mt-2">ID do usuário: {usuario.id}</p>

      <button
        onClick={irParaPerfil}
        className="mt-6 px-6 py-2 bg-white text-[#0f2606] rounded-full font-semibold shadow hover:bg-gray-200 transition"
      >
        Ver meu perfil
      </button>
    </main>
  );
}