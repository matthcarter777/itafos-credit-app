'use client'

import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '../Input/Input';
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEmailCliente } from '@/app/services/create/CreateEmailCliente';
import toast from 'react-hot-toast';


type CreateParecerComercialModalProps = {
  title: string;
  clienteId: string;
}

const createEmailClienteSchema = z.object({
  email: z
    .string()
    .nonempty('O e-mail é obrigatório.')
    .email('Informe um e-mail válido.'),
  descricao: z
    .string()
    .nonempty('A descrição é obrigatória. Ex: Administrativo.'),
});
type CreateEmailClienteSchema = z.infer<typeof createEmailClienteSchema>;
export default function CreateEmailClienteModal({ title, clienteId }: CreateParecerComercialModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createEmailCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      setIsOpen(false);
      toast.success('Email criado!');
    },
    onError: (error) => {
      toast.error('Erro ao criar email');
    },
  });

  const { register, handleSubmit, formState: { errors } } = useForm<CreateEmailClienteSchema>({
    resolver: zodResolver(createEmailClienteSchema),
  });

  const handleFormSubmit = async (data: CreateEmailClienteSchema) => {
    setIsOpen(false); 

    await mutation.mutateAsync({
      email: data.email,
      descricao: data.descricao,
      clienteId
    });
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
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <Input<CreateEmailClienteSchema>
              label="E-mail"
              type="email"
              name="email"
              register={register}
              errors={errors}
              placeholder="Digite o e-mail do cliente"
            />

            <Input<CreateEmailClienteSchema>
              label="Descrição"
              name="descricao"
              register={register}
              errors={errors}
              placeholder="Ex: Administrativo, Financeiro, etc."
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
        </div>
      )}
    </div>
  )
}
