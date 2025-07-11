import { useState } from "react";
import Image from "next/image";
import Link from "next/link";


interface CardProps {
    autor : string;
    professor : string;
    data : string;
    hora : string;
    conteudo : string;
    comentarios : number;
    disciplina : string;
    fotoAutorUrl?: string;
    permissaoEditar: boolean;

    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void; 

}



export default function CardPublicacao({autor, professor, data, hora, conteudo,  comentarios, fotoAutorUrl, disciplina, permissaoEditar, onEdit, onDelete } : CardProps) {
    const imagemSrc = fotoAutorUrl ? fotoAutorUrl : '/default-avatar.png'
    
    return (
        <div className="rounded-lg bg-emerald-500 p-4 shadow-md">
            <div className="flex space-x-5">
            <Image
                src={imagemSrc}
                alt="Foto de perfil"
                width={48}
                height={48}
                className="w-16 h-16 object-contain rounded-full overflow-hidden shadow-lg"
                >
            </Image>
            <div className="flex space-x-4 items-start flex-col flex-grow">
            <div className="flex space-x-2">
                <div className="font-bold text-black">{autor}</div>
                <div className="text-gray text">• {data}, às {hora} • {professor} • {disciplina} </div>
            </div>
            
            <p className="text-gray-900 mt-2">{conteudo}</p>
            <div className="flex justify-between mt-2 w-full">
                <span>
                    <button className="text-gray">💬 {comentarios} comentários</button>
                </span>

                {permissaoEditar && 
                <div className="flex space-x-2 pr-8">
                    <div>editar</div>
                    <div>excluir</div>
                </div>
                }
                
            </div>
            </div>
            </div>
        </div>
    )




}