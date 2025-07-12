"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiUser, FiMail, FiLock, FiBookOpen, FiHome } from "react-icons/fi";
import { cadastrarUsuario, fileToBase64 } from "../utils/api";
import { toast } from "react-toastify";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [curso, setCurso] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [foto, setFoto] = useState<File | null>(null);

  const [erros, setErros] = useState({
    nome: "",
    email: "",
    senha: "",
    curso: "",
    departamento: "",
  });

  const router = useRouter();

  const handleImagem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFoto(file);
    }
  };

  const validarCampos = () => {
    const novosErros: any = {};
    if (!nome.trim()) novosErros.nome = "Informe seu nome.";
    if (!email.trim()) novosErros.email = "Informe um e-mail válido.";
    if (!senha.trim()) novosErros.senha = "A senha é obrigatória.";
    if (!curso.trim()) novosErros.curso = "Informe seu curso.";
    if (!departamento.trim()) novosErros.departamento = "Informe seu departamento.";
    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      toast.error("Preencha todos os campos obrigatórios corretamente.");
    }

    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarCampos()) return;

    try {
      let fotoBase64: string | null = null;
      if (foto) {
        fotoBase64 = await fileToBase64(foto);
      }

      await cadastrarUsuario({
        nome,
        email,
        senha,
        curso,
        departamento,
        fotoPerfil: fotoBase64,
      });

      toast.success("Usuário cadastrado com sucesso!");
      router.push("/login");
    } catch (error: any) {
      console.error("Erro ao cadastrar:", {
        status: error?.response?.status,
        data: error?.response?.data,
        message: error?.response?.data?.message,
      });

      if (error.response?.status === 409) {
        const mensagem = error.response?.data?.message || "E-mail já cadastrado.";
        setErros((prev) => ({ ...prev, email: mensagem }));
        toast.error(mensagem);
      } else {
        toast.error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <div className="relative min-h-screen flex overflow-hidden font-sans bg-[#0f2606]">
      <video
        src="/fundo2.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="hidden md:flex flex-col justify-center items-center w-1/2 z-20 text-white px-10">
        <h2 className="text-3xl font-bold drop-shadow-md mb-4 text-center">Já tem uma conta?</h2>
        <p className="text-lg mb-4 text-center">Entre para continuar explorando a Liga!</p>
        <Link
          href="/login"
          className="px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[#0f2606] transition font-semibold"
        >
          Fazer login
        </Link>
      </div>

      <div className="relative z-20 flex w-full md:w-1/2 h-screen items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl shadow-lg p-10">
          <h1 className="text-4xl font-extrabold text-white text-center mb-2 drop-shadow-lg">Seja Bem-Vindo!</h1>
          <h2 className="text-2xl font-semibold text-white text-center mb-6 drop-shadow-md">Liga dos Avaliadores</h2>

          {/* Avatar com upload de imagem */}
          <div className="flex justify-center mb-6">
            <label htmlFor="foto-perfil" className="cursor-pointer group">
              <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-[#6B732F] shadow-md bg-white/70 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={foto ? URL.createObjectURL(foto) : "/default-avatar.png"}
                  alt="Foto de perfil"
                  fill
                  className="object-cover"
                />
              </div>
            </label>
            <input
              id="foto-perfil"
              type="file"
              accept="image/*"
              onChange={handleImagem}
              className="hidden"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-[#9ba796]">
            {/* Nome */}
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B732F]" />
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                  setErros((prev) => ({ ...prev, nome: "" }));
                }}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white/75 text-black placeholder-[#5f6b38] font-medium border border-gray-300 focus:outline-none focus:ring-4 focus:ring-[#BB7C4E]/60"
              />
              {erros.nome && <p className="text-red-500 text-sm ml-2 mt-1">{erros.nome}</p>}
            </div>

            {/* Email */}
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B732F]" />
              <input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErros((prev) => ({ ...prev, email: "" }));
                }}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white/75 text-black placeholder-[#5f6b38] font-medium border border-gray-300 focus:outline-none focus:ring-4 focus:ring-[#BB7C4E]/60"
              />
              {erros.email && <p className="text-red-500 text-sm ml-2 mt-1">{erros.email}</p>}
            </div>

            {/* Senha */}
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B732F]" />
              <input
                type="password"
                placeholder="Crie uma senha"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  setErros((prev) => ({ ...prev, senha: "" }));
                }}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white/75 text-black placeholder-[#5f6b38] font-medium border border-gray-300 focus:outline-none focus:ring-4 focus:ring-[#BB7C4E]/60"
              />
              {erros.senha && <p className="text-red-500 text-sm ml-2 mt-1">{erros.senha}</p>}
            </div>

            {/* Curso */}
            <div className="relative">
              <FiBookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B732F]" />
              <input
                type="text"
                placeholder="Seu curso"
                value={curso}
                onChange={(e) => {
                  setCurso(e.target.value);
                  setErros((prev) => ({ ...prev, curso: "" }));
                }}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white/75 text-black placeholder-[#5f6b38] font-medium border border-gray-300 focus:outline-none focus:ring-4 focus:ring-[#BB7C4E]/60"
              />
              {erros.curso && <p className="text-red-500 text-sm ml-2 mt-1">{erros.curso}</p>}
            </div>

            {/* Departamento */}
            <div className="relative">
              <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B732F]" />
              <input
                type="text"
                placeholder="Seu departamento"
                value={departamento}
                onChange={(e) => {
                  setDepartamento(e.target.value);
                  setErros((prev) => ({ ...prev, departamento: "" }));
                }}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white/75 text-black placeholder-[#5f6b38] font-medium border border-gray-300 focus:outline-none focus:ring-4 focus:ring-[#BB7C4E]/60"
              />
              {erros.departamento && <p className="text-red-500 text-sm ml-2 mt-1">{erros.departamento}</p>}
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="w-[200px] h-[50px] bg-[#BB7C4E] text-white font-semibold rounded-full hover:bg-[#a5643b] transition duration-300 shadow-md"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
