//ISSO É MUITO PROTÓTIPO AINDA, SÓ COMECEI PRA PODER FAZER PAGINA DE PERFIL

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
    logado : boolean;
}


export default function Header({logado} : HeaderProps) {
    return (
        <header className="flex bg-emerald-300 p-4 justify-between" >
            <div className="flex items-center">
                <Link href="/">
                    <Image
                        src='/unb.png'
                        alt="Logo da Unb"
                        width={100}
                        height={50}
                        className="object-contain"
                        >
                    </Image>
                </Link>
            </div>

            <div>
                <button className="text-black bg-white rounded px-6">sair</button>
            </div>
  
            

        </header>
    )
}