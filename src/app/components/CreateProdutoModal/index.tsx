'use client'

import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '../Input/Input';
import { useState } from 'react'
import { Toast } from '../Toast/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduto } from '@/app/services/create/CreateProduto';


type CreateProdutoModalProps = {
  title: string;
}

const createProdutoSchema = z.object({
  nome: z.string().nonempty('Nome da regra não pode ser em branco.')
});

type CreateProdutoSchema = z.infer<typeof createProdutoSchema>;
export default function CreateProdutoModal({ title }: CreateProdutoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProduto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos'] });
      setShowToast(true);
      setIsOpen(false);
    },
    onError: (error) => {
      console.error('Erro ao criar RTV:', error);
    },
  });

  const { register, handleSubmit, formState: { errors } } = useForm<CreateProdutoSchema>({
    resolver: zodResolver(createProdutoSchema),
  });

  const handleFormSubmit = async (data: CreateProdutoSchema) => {
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
            <h2 className="text-xl font-bold mb-4">Criar Produto</h2>
              <Input<CreateProdutoSchema>
                label="Nome"
                name="nome"
                register={register}
                errors={errors}
                placeholder="Digite o nome do produto"
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
