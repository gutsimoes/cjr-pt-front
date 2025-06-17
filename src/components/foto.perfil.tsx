import Image from 'next/image';
import { useState } from 'react';

interface FotoPerfilProps {
  onImagemSelecionada?: (imagemBase64: string) => void;
}

export default function FotoPerfil({ onImagemSelecionada }: FotoPerfilProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [erroImagem, setErroImagem] = useState(false);

  const handleImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        setErroImagem(false);
        onImagemSelecionada?.(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const imagemSrc = !erroImagem && preview ? preview : '/default-avatar.png';

  return (
    <div className="flex flex-col items-center mb-6">
      <label htmlFor="foto-perfil" className="cursor-pointer flex flex-col items-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-black-500 shadow-md mb-2">
          <Image
            src={imagemSrc}
            alt="Foto de perfil"
            fill
            className={`object-cover ${!preview ? 'scale-130' : ''}`}
            onError={() => setErroImagem(true)}
            unoptimized
            sizes="96px"
          />
        </div>
        <span className="text-sm text-black hover:underline">Adicionar foto de perfil</span>
        <input
          id="foto-perfil"
          type="file"
          accept="image/*"
          onChange={handleImagem}
          className="hidden"
        />
      </label>
    </div>
  );
}
