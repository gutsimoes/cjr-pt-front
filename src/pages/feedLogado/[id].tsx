'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
        if (id) {
            axios
                .get(`http://localhost:3001/user/${id}`)
                .then((res) => setUsuario(res.data))
                .catch((err) => console.error('Erro ao buscar usuário:', err));
        }
    }, [id]);

    if (!usuario) {
        return <p className="text-center text-gray-500 mt-10">Carregando dados do usuário...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">
                Feed do Usuário {usuario.nome} (ID: {usuario.id})
            </h1>
            <p className="text-gray-700">E-mail: {usuario.email}</p>
        </div>
    );
}
