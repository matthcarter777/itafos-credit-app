'use client'

import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '../Input/Input';
import { useState } from 'react'
import { Toast } from '../Toast/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRegra } from '@/app/services/create/CreateRegra';


type CreateUserModalProps = {
  title: string;
}

const createRegraSchema = z.object({
  nome: z.string().nonempty('Nome da regra não pode ser em branco.')
});

type CreateRegraSchema = z.infer<typeof createRegraSchema>;
export default function CreateUserModal({ title }: CreateUserModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createRegra,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      setShowToast(true);
      setIsOpen(false);
    },
    onError: (error) => {
      console.error('Erro ao criar Regra:', error);
    },
  });

  const { register, handleSubmit, formState: { errors } } = useForm<CreateRegraSchema>({
    resolver: zodResolver(createRegraSchema),
  });


  const handleFormSubmit = async (data: CreateRegraSchema) => {
    setIsOpen(false); 

    await mutation.mutateAsync(data);
  };

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
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <form 
            className="bg-gray-300 p-6 rounded shadow-lg w-full max-w-md flex flex-col gap-3" 
            onSubmit={handleSubmit(handleFormSubmit)} >
            <h2 className="text-xl font-bold mb-4">Criar Regra</h2>
              <Input<CreateRegraSchema>
                label="Nome"
                name="nome"
                register={register}
                errors={errors}
                placeholder="Digite o nome da regra"
              />
            <button
              className="px-4 py-2 bg-emerald-700  text-white rounded hover:bg-emerald-800 transition"
              type="submit"
            >
              Salvar
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Fechar
            </button>
          </form>

          {showToast && (
            <Toast
              message="Usuario salvos com sucesso!"
              onClose={() => setShowToast(false)}
            />
          )}
        </div>
      )}
    </div>
  )
}
