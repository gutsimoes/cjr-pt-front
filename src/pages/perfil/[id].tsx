'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Usuario {
    id: string;
    nome: string;
    email: string;
}

export default function Perfil() {
    const router = useRouter();
    const { id } = router.query;
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [autorizado, setAutorizado] = useState(false);

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem('usuario');

        if (!usuarioSalvo) {
            router.push('/login');
            return;
        }

        try {
            const user: Usuario = JSON.parse(usuarioSalvo);

            if (!user.id || (id && id !== String(user.id))) {
                router.push('/login');
                return;
            }

            setUsuario(user);
            setAutorizado(true);
        } catch (erro) {
            console.error('Erro ao ler usuário:', erro);
            router.push('/login');
        }
    }, [id, router]);

    if (!autorizado || !usuario) {
        return <p className="text-center mt-10 text-gray-600">Verificando autorização...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold mb-4 text-[#6B732F]">Perfil do Usuário</h1>
            <div className="space-y-2 text-gray-800">
                <p><strong>ID:</strong> {usuario.id}</p>
                <p><strong>Nome:</strong> {usuario.nome}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
            </div>
        </div>
    );
}
