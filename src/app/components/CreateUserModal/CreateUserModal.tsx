'use client'

import { useState } from 'react'

type CreateUserModalProps = {
  title: string;
}
export default function CreateUserModal({ title }: CreateUserModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(true)}
        className="
        bg-emerald-700 
        text-stone-50 
        rounded-sm 
        h-10 
        font-bold 
        hover:bg-emerald-800 
        transition-colors
        p-3
        flex
        items-center
        justify-center
      " 
      >
        { title }
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
          <div className="bg-gray-300 p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Criar usuario</h2>
            <p className="mb-4">Conteúdo do seu modal aqui...</p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-emerald-700  text-white rounded hover:bg-emerald-800 transition"
            >
              Salvar
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
