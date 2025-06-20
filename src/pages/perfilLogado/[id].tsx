'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  curso?: string;
  departamento?: string;
  fotoPerfil?: string;
}

function decodeJwtPayload(token: string): any {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export default function Perfil() {
  const router = useRouter();
  const { id } = router.query;

  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const payload = token ? decodeJwtPayload(token) : null;

    // 🔐 Verifica se o token existe e se o ID do token bate com o da URL
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

  if (!usuario) return <p className="text-white">Carregando perfil...</p>;

  return (
    <main className="min-h-screen bg-[#0f2606] text-white p-8 font-sans">
      <h1 className="text-3xl font-bold mb-4">Perfil de {usuario.nome}</h1>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Curso:</strong> {usuario.curso || 'Não informado'}</p>
      <p><strong>Departamento:</strong> {usuario.departamento || 'Não informado'}</p>
    </main>
  );
}
