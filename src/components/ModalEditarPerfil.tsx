"use client"

import { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


interface ModalProps {
  id: number;
  fotoURL?: string;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  nome: string;
  email: string;
  curso: string;
  departamento: string;
  senhaAtual: string;
  novaSenha: string;
  confirmarSenha: string;
}

export default function ModalEditarPerfil({
  id,
  onClose, 
  onSuccess,
  fotoURL
}: ModalProps) {
  
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    curso: '',
    departamento: '',
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDelete = async () => {
    if (!deletePassword.trim()) {
      setError('Digite sua senha atual para excluir o perfil.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('token')
      
      await axios.delete(`http://localhost:3001/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { senha: deletePassword.trim() }
      })

      localStorage.removeItem("token")
      

      onSuccess()
      onClose()

      window.location.href = '/'

    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao excluir perfil')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (formData.novaSenha.trim()) {
      if (!formData.senhaAtual.trim()) {
        setError('Digite a senha atual')
        return
      }
      if (formData.novaSenha !== formData.confirmarSenha) {
        setError('As senhas devem ser iguais.')
        return
      }
    }

    setIsLoading(true)

    try {
      const token = localStorage.getItem('token')
      
      const updateData: any = {}
      
      if (formData.nome.trim()) updateData.nome = formData.nome.trim()
      if (formData.email.trim()) updateData.email = formData.email.trim()
      if (formData.curso.trim()) updateData.curso = formData.curso.trim()
      if (formData.departamento.trim()) updateData.departamento = formData.departamento.trim()
      
      if (formData.novaSenha.trim()) {
        updateData.senha = formData.novaSenha.trim()
      }

      await axios.patch(`http://localhost:3001/user/${id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao atualizar perfil')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">Editar Perfil</h2>
          <button onClick={onClose} className="text-2xl cursor-pointer">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="flex justify-center mb-6">
            <Image
              src={fotoURL || '/default-avatar.png'}
              alt="Avatar"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded">
              {error}
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder='Nome'
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"

            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder='E-mail'
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Curso"
              name="curso"
              value={formData.curso}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Departamento"
              name="departamento"
              value={formData.departamento}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <input
              type="password"
              name="senhaAtual"
              value={formData.senhaAtual}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Senha atual (obrigatório para alterar senha)"
            />
          </div>

          <div>
            <input
              type="password"
              name="novaSenha"
              value={formData.novaSenha}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Nova senha (deixe em branco para não alterar)"
            />
          </div>

          <div>
            <input
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Confirme a nova senha"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer flex-1 py-2 bg-gray-200 rounded hover:bg-gray-300"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className=" cursor-pointer flex-1 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>

          {/* Delete Profile Button */}
          <div className="pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowDeleteConfirmation(true)}
              className="w-full py-2 bg-red-600 text-white cursor-pointer rounded hover:bg-red-700 disabled:opacity-50"
              disabled={isLoading}
            >
              Excluir Perfil
            </button>
          </div>
        </form>

        {showDeleteConfirmation && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
              <h3 className="text-lg font-bold text-red-600 mb-4">Excluir Perfil</h3>
              <p className="text-gray-700 mb-4">
                Esta ação não pode ser desfeita. Para confirmar, digite sua senha atual:
              </p>
              
              <input
                type="password"
                placeholder="Senha atual"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirmation(false)
                    setDeletePassword('')
                    setError(null)
                  }}
                  className="flex-1 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Excluindo...' : 'Excluir'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}