import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export async function cadastrarUsuario({
  nome,
  email,
  senha,
  curso,
  departamento,
  fotoPerfil,
}: {
  nome: string;
  email: string;
  senha: string;
  curso: string;
  departamento: string;
  fotoPerfil?: string | null;
}) {
  try {
    const response = await api.post('/user', {
      nome,
      email,
      senha,
      curso,
      departamento,
      fotoPerfil,
    });
    return response.data;
  } catch (error) {
    // ⚠️ Aqui você repassa o erro pro componente tratar
    throw error;
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
