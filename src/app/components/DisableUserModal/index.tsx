'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Lock, LockOpen, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteConjuge } from '@/app/services/delete/DeleteConjugeService';
import { disableUser } from '@/app/services/update/DisableUser';


type ModalProps = {
  id: string;
  isDisabled: boolean;
  queryId: string;
  ativo: boolean;
}

export default function DisableUserModal({ id, isDisabled, queryId, ativo }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
 
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: disableUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${queryId}`] });
      setIsOpen(false);
      toast.success('Conjuge excluido.');
    },
    onError: (error) => {
      toast.error('Erro ao excluir Conjuge');
    },
  });


  const removerParecer = async () => {
    await mutation.mutateAsync(id);
  }

    return (
      <div className="">
        <button
          onClick={() => setIsOpen(true)}
          className={`px-3 py-1 text-sm text-white ${
            ativo ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"  
          } rounded`}
        >
          {ativo ? <LockOpen size="20px" /> : <Lock size="20px" />}
        </button>
  
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div 
              className="bg-gray-300 p-6 rounded shadow-lg w-full max-w-md flex flex-col gap-3">
              <h2 className="text-xl font-bold mb-4">{`Deseja ${ativo ? 'desabilitar' : 'habilitar'} o usuario ?`}</h2>
              <button
                className={`px-4 py-2 ${ ativo ? "bg-red-600" : "bg-green-600"} text-white rounded transition`}
                type="submit"
                onClick={removerParecer}
              >
                { ativo ? 'Desabilitar' : 'Habilitar'}
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
