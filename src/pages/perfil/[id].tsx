'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Image from 'next/image';
import CardPublicacao from '../../components/CardPublicacao';


interface Usuario {
    id: string;
    nome: string;
    email: string;
    departamento: string;
    curso: string;
}

interface Avaliacao {
    id: number;
    userId: number
    professorID: number;
    disciplinaID: number;
    conteudo: string;
    updatedAt: string;

}

export default function FeedLogado() {
    const router = useRouter();
    const { id } = router.query;

    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const [avaliacoes, setAvaliacoes] =  useState<Avaliacao[]>([])


    // teste com o banco de dados temporario 
    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:3001/user/${id}`)
                .then((res) => setUsuario(res.data))
                .catch((err) => console.error('Erro ao buscar usuário:', err));
            axios
                .get(`http://localhost:3001/avaliacao?userId=${id}`)
                .then((res) => setAvaliacoes(res.data))
                .catch((err) => console.error("Erro ao buscar avaliações do usuário:", err))
        }
    }, [id]);

    if (!usuario) {
        return <p className="text-center text-gray-500 mt-10">Carregando dados do usuário...</p>;
    }


    //onde editar 
    return (
        <>
        
        <Header logado={true} />
        <main>
        <div className="container mx-auto bg-gray-100 max-w-4xl">
            <section className="mb-6 relative">
                {/* fundo e informacoes perfil */}
                <div className='bg-emerald-600 h-40 w-full'></div>

                <div className='mx-26 -mt-22'>
                <div className='flex justify-between'>
                    <Image
                        src='/default-avatar.png'
                        alt="Foto de perfil"
                        width={160}
                        height={160}
                        className="w-44 h-44 object-contain rounded-full overflow-hidden shadow-lg"
                        >
                    </Image>

                    <button className='bg-black text-white w-[200px] h-[50px] rounded-full mt-26 '>Editar Perfil</button>
                    {/* abrir dialogo com edição e possibilidade de apagar perfil */}


                </div >
                    <h1 className="text-2xl font-bold mb-4 mt-4"> {usuario.nome} </h1>
                    <h2 className='text-gray-700 mb-2'>{usuario.curso} / {usuario.departamento}</h2>
                    <p className="text-gray-700">{usuario.email} </p>

                </div>

                
            </section>

            <section>
                {/* lista de card c/ avaliacoes */}

                <h2 className='text-xl mx-10 font-semibold text-black mb-4 '>Publicações</h2> 
                <div className='space-y-4 mx-10'>

                    {avaliacoes.length > 0? (
                        avaliacoes.map((avaliacao) => (
                            <CardPublicacao
                                autor={usuario.nome}
                                professor={String(avaliacao.professorID)}

                                data={new Date(avaliacao.updatedAt).toLocaleDateString()}

                                hora={new Date(avaliacao.updatedAt).toLocaleTimeString().substring(0,5)}
                                conteudo={avaliacao.conteudo}
                                comentarios={4} // ERRADO!! ESPERAR CRUD DE COMENTARIOS PARA IMPLEMENTAR CERTO
                                disciplina={"Disciplina teste"} // crud disciplina?
                            />
                        ))
                    ) : (<p className='text-center'>Não há avaliações publicadas ainda.</p>)}
                </div>

                
            </section>
            
            
        </div>
        </main>
        
        </>
    );
}