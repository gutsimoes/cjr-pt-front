'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Feed() {
    const router = useRouter();
    const [usuario, setUsuario] = useState<any>(null);
    const [autorizado, setAutorizado] = useState(false);

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem('usuario');

        if (!usuarioSalvo) {
            router.push('/login');
            return;
        }

        const user = JSON.parse(usuarioSalvo);

        setUsuario(user);
        setAutorizado(true);
    }, [router]);

    if (!autorizado || !usuario) {
        return (
            <p className="text-center mt-10 text-gray-600">Verificando autorização...</p>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">
                Bem-vindo, {usuario.nome}!
            </h1>
            <p className="text-gray-700">Aqui é o seu feed logado.</p>

            <Link href={`/perfil/${usuario.id}`}>
                <button className="mt-4 px-4 py-2 bg-[#6B732F] text-white rounded hover:bg-[#5c6428] transition-colors">
                    Ver meu perfil
                </button>
            </Link>
        </div>
    );
}
