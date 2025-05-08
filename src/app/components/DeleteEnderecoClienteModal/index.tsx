'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteReferencia } from '@/app/services/delete/DeleteReferencia';
import { deleteEnderecoCliente } from '@/app/services/delete/DeleteEnderecoCliente';


type CreateParecerComercialModalProps = {
  title: string;
  id: string;
}

export default function DeleteEnderecoClienteModal({ title, id }: CreateParecerComercialModalProps) {
  const [isOpen, setIsOpen] = useState(false);
 
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteEnderecoCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      setIsOpen(false);
      toast.success('Endereço excluido.');
    },
    onError: (error) => {
      toast.error('Erro ao excluir Endereço');
    },
  });


  const handleDelete = async () => {
    await mutation.mutateAsync({ id });
  }

    return (
      <div className="">
        <button
          onClick={() => setIsOpen(true)}
          className="px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded"
        >
           <Trash2 size="20px" />
        </button>
  
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
