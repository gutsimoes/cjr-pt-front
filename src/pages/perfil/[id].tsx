"use client"

import { useRouter, useParams } from "next/navigation"  // useParams para pegar params no App Router
import { useEffect, useState } from "react"
import axios from "axios"
import HeaderLogado from "../../components/Header-logado"  // Ajuste o caminho conforme sua pasta
import HeaderDeslogado from "../../components/Header-deslogado"
import Image from "next/image"
import CardPublicacao from "../../components/CardPublicacao"
import ModalEditarPerfil from "../../components/ModalEditarPerfil"

//props
interface Usuario {
  id: number
  nome: string
  email: string
  curso?: string
  departamento?: string
  fotoPerfil?: string
  dataCriacao?: string
  cidade?: string
}

interface Avaliacao {
    id: number;
    userId: number
    professorID: number;
    disciplinaID: number;
    conteudo: string;
    updatedAt: string;
}

interface Professor {
  id: number
  nome: string
  disciplina: number
  imagem: string | null
}

interface AvaliacaoCompleta extends Avaliacao {
  professorNome : string;
  n_comentarios : number;
}

interface ViewState {
    logado: boolean;
    proprioPerfil: boolean;
    sessaoUserId?: number;
}

//verifica token
function decodeJwtPayload(token: string): any {
  try {
    const payload = token.split(".")[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

// formata a data que vem do backend (yyyy‑mm‑dd…) para dd/mm/aaaa
function formatarData(dataString?: string) {
  if (!dataString) return "Não informado"
  const data = new Date(dataString)
  return data.toLocaleDateString("pt-BR")
}

export default function PerfilCompleto() {
  const router = useRouter() // rota dinamica
  const params = useParams() // Pega parâmetros 
  const id = params?.id // Pega o id 

  const [usuario, setUsuario] = useState<Usuario | null>(null)  // dados do usuário carregados do backend
  const [loading, setLoading] = useState(true) // carregadno
  const [error, setError] = useState<string | null>(null) // mensagens de erro
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([])
  const [avaliacoesCompletas, setAvaliacoesCompletas] = useState<AvaliacaoCompleta[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [viewState, setViewState] = useState<ViewState>({
    logado: false,
    proprioPerfil: false,
  })

  useEffect(() => {

    if (!id) {
      return
    }

    const token = localStorage.getItem("token")
    
    let sessaoUserId: number | undefined
    let logado = false
    let proprioPerfil = false

    if(token) {
        const payload = decodeJwtPayload(token)
        if(payload) {
            sessaoUserId = payload.sub
            logado = true;
            proprioPerfil = (String(sessaoUserId) == String(id));
        }

    }

    setViewState({
        logado,
        proprioPerfil,
        sessaoUserId,
    })

    const userRequest = axios.get(`http://localhost:3001/user/public/${id}`);
    const avaliacoesRequest = axios.get(`http://localhost:3001/avaliacao/autor/${id}`);
    const professoresRequest = axios.get(`http://localhost:3001/professor`);
    const nComentariosRequest = axios.get(`http://localhost:3001/comentario/n_comentarios`);


    Promise.all([userRequest, avaliacoesRequest, professoresRequest, nComentariosRequest])
      .then(([userResponse, avaliacoesResponse, professoresResponse, nComentariosResponse]) => {
        const usuarioData = userResponse.data;
        const avaliacoesData = avaliacoesResponse.data;
        const todosProfessores = professoresResponse.data;
        const comentariosData = nComentariosResponse.data;
        

        const professorMap = todosProfessores.reduce((map : Record<number,string>, prof: Professor) => {
          map[prof.id] = prof.nome; 
          return map;
        }, {});

        const numeroComentariosMap = nComentariosResponse.data;

        const avaliacoesCompletasData: AvaliacaoCompleta[] = avaliacoesData.map((avaliacao: Avaliacao) => ({
          ...avaliacao,
          professorNome: professorMap[avaliacao.professorID] || "Professor não encontrado",
          n_comentarios: numeroComentariosMap[avaliacao.id] || 0
        }));
        
        setUsuario(usuarioData);
        setAvaliacoesCompletas(avaliacoesCompletasData);
      })
      .catch(err => {
        console.error(err);
        setError("Erro ao carregar dados do perfil");
      })
      .finally(() => {
        setLoading(false);
      });
}, [id, router]);

  // leva de volta ao feed
  function voltarAoFeed() {
    if(viewState.logado) {
        router.push(`/feedLogado/${id}`)
    } else {
        router.push('/feed-deslogado')
    }
}

    function levaLogin() {
        router.push('/login');
    }


  if (loading) return <div>Carregando perfil...</div>
  if (error) return <div>{error}</div>
  if (!usuario) return <div>Usuário não encontrado</div>

  return(
        <>
        
        {viewState.logado ? <HeaderLogado/> : <HeaderDeslogado/>}

        <main className="mt-18">
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
                    {viewState.proprioPerfil && (
                        <button     
                        onClick={() => setMostrarModal(true)} 
                        className='bg-black text-white w-[200px] h-[50px] rounded-full mt-26 '
                        >Editar Perfil
                        </button>
                    )}


                        {mostrarModal && (
                        <ModalEditarPerfil
                            {...usuario}
                            onClose={() => setMostrarModal(false)}
                        />
                        )}


                </div>

                    <h1 className="text-2xl font-bold mb-4 mt-4"> {usuario.nome} </h1>
                    <h2 className='text-gray-700 mb-2'>{usuario.curso} / {usuario.departamento}</h2>
                    <p className="text-gray-700">{usuario.email} </p>

                </div>

                
            </section>



            <section>
                {/* lista de card c/ avaliacoes */}

                <h2 className='text-xl mx-10 font-semibold text-black mb-4 '>Publicações</h2> 
                <div className='space-y-4 mx-10'>

                    {avaliacoesCompletas.length > 0? (
                        avaliacoesCompletas.map((avaliacao) => (
                            <CardPublicacao
                          
                                autor={usuario.nome}
                                professor={avaliacao.professorNome}

                                data={formatarData(avaliacao.updatedAt)}

                                hora={new Date(avaliacao.updatedAt).toLocaleTimeString().substring(0,5)}
                                conteudo={avaliacao.conteudo}
                                comentarios={avaliacao.n_comentarios}
                                disciplina={"Disciplina"} //arrumar
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
