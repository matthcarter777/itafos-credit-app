'use client'

import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '../Input/Input';
import { useState } from 'react'
import { Toast } from '../Toast/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Select from '../Select/Select';
import { ClienteOptions } from '@/app/types/ClienteOptions';
import { getClientes } from '@/app/services/hooks/getClientes';
import { RTV } from '@/app/types/RTV';
import { getRTV } from '@/app/services/hooks/getRTV';
import { createProposta } from '@/app/services/create/CreateProposta';


type CreateProposalModalProps = {
  title: string;
}

const createProposalSchema = z.object({
  nome: z.string().nonempty('Nome da proposta não pode ser em branco.'),
  validade: z.string().nonempty('Validade da proposta não pode ser em branco.'),
  clienteId: z.string().nonempty('Cliente da proposta deve ser selecionado.'),
  rtvId: z.string().nonempty('RTV responsaval pela proposta deve ser selecionado.'),
});

type CreateProposalSchema = z.infer<typeof createProposalSchema>;
export default function CreateProposalModal({ title }: CreateProposalModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const queryClient = useQueryClient();

  const clientes = useQuery<ClienteOptions[]>({ queryKey: ['clientes'], queryFn: getClientes });
  const rtvs = useQuery<RTV[]>({ queryKey: ['rtvs'], queryFn: getRTV });
  

  const mutation = useMutation({
    mutationFn: createProposta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['propostas'] });
      setShowToast(true);
      setIsOpen(false);
    },
    onError: (error) => {
      console.error('Erro ao criar Regra:', error);
    },
  });

  const { register, handleSubmit, formState: { errors } } = useForm<CreateProposalSchema>({
    resolver: zodResolver(createProposalSchema),
  });


  const handleFormSubmit = async (data: CreateProposalSchema) => {
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
            <h2 className="text-xl font-bold mb-4">{title}</h2>
              <Input<CreateProposalSchema>
                label="Nome da Proposta"
                name="nome"
                register={register}
                errors={errors}
                placeholder="Digite o nome da regra"
              />
              <Input<CreateProposalSchema>
                label="Validade da Proposta"
                name="validade"
                type='date'
                register={register}
                errors={errors}
                placeholder="Digite o nome da regra"
              />
              <Select<CreateProposalSchema>
                label="Cliente"
                name="clienteId"
                register={register}
                errors={errors}
                options={clientes.data || []}
              />
              <Select<CreateProposalSchema>
                label="RTV"
                name="rtvId"
                register={register}
                errors={errors}
                options={rtvs.data || []}
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
