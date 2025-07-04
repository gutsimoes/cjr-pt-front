"use client"

interface Usuario {
  id: number;
  nome: string;
  email: string;
  imagem?: string | null;
  dataCriacao?: string;
  departamento?: string;
  curso?: string;
}

interface ModalProps extends Usuario {
  onClose: () => void;
}

export default function ModalEditarPerfil({id, nome,email, dataCriacao, curso, departamento} : ModalProps) {
  return (
      <div className="min-h-screen cor-fundo">
        <main className="pt-24 text-black flex flex-col items-center justify-center font-sans p-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Perfil, {nome}!</h1>
            <p className="text-lg mb-2">Email: {email}</p>
            <p className="text-md mb-8">ID do usuário: {id}</p>
  
            {/* Conteúdo do perfil */}
            <div className="mt-12 w-full max-w-4xl text-left">
              <h2 className="text-2xl font-semibold mb-6">Seu perfil</h2>
              <div className="to-black rounded-lg p-6">
                <p>Curso: {curso || "Não informado"}</p>
                <p>Departamento: {departamento || "Não informado"}</p>
                <p>Data de criação: {(dataCriacao)}</p>
                {/* Você pode adicionar mais campos aqui */}
  
              </div>
            </div>
          </div>
        </main>
      </div>
    )
}
