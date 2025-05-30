'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteFazenda } from '@/app/services/delete/DeleteFazenda';


type ModalProps = {
  title: string;
  id: string;
  queryId: string;
}

export default function DeleteFazendaModal({ title, id, queryId }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
 
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteFazenda,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${queryId}`] });
      setIsOpen(false);
      toast.success('Fazenda excluido.');
    },
    onError: (error) => {
      toast.error('Erro ao excluir fazendal');
    },
  });


  const handleDelete = async () => {
    await mutation.mutateAsync({ id });
  }

    return (
      <div className="">
        <div className="relative">
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-400 hover:text-red-500"
          >
            <X size={20} />
          </button>
        </div>

  
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div 
              className="bg-gray-300 p-6 rounded shadow-lg w-full max-w-md flex flex-col gap-3">
              <h2 className="text-xl font-bold mb-4">Excluir</h2>
              <p>{title}</p>
              <button
                className="px-4 py-2 bg-red-700  text-white rounded hover:bg-red-800 transition"
                type="submit"
                onClick={handleDelete}
              >
                Excluir
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    )
}
