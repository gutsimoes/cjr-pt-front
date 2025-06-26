import Image from "next/image";

interface Props {
  nome: string;
  disciplina: string;
  imagem: string | null;
}

export default function ProfessorCard({ nome, disciplina, imagem }: Props) {
  return (
    <div className="group relative rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-sm p-10 text-center shadow-md transition-transform duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-[#043452]/30 max-w-sm mx-auto">
      {/* Background gradient on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#043452]/10 to-[#ffa45d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Imagem do professor ou interrogação */}
        <div className="relative w-36 h-36 mb-8 rounded-3xl overflow-hidden border-4 border-[#ffa45d]/50 shadow-lg transition-transform duration-300 group-hover:scale-105 flex items-center justify-center bg-white">
          {imagem ? (
            <Image
              src={imagem}
              alt={`Foto de ${nome}`}
              width={144}
              height={144}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-9xl text-[#ffa45d]/20 select-none pointer-events-none font-bold">
              ?
            </div>
          )}
        </div>

        {/* Nome */}
        <h3 className="mb-4 text-2xl font-extrabold text-[#043452]">{nome}</h3>

        {/* Disciplina */}
        <span className="inline-block mb-8 px-4 py-1.5 rounded-full bg-[#ffa45d]/20 text-[#ffa45d] font-medium border border-[#ffa45d]/30 text-sm">
          {disciplina}
        </span>

        {/* Botão */}
        <button
          className="w-full rounded-xl bg-[#043452] text-white py-2 font-medium text-sm transition-transform duration-300 hover:bg-[#043452]/90 hover:scale-105 shadow-lg hover:shadow-[#043452]/40"
          type="button"
        >
          Ver Perfil
        </button>
      </div>
    </div>
  );
}
