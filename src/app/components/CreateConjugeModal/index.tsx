'use client'

import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '../Input/Input';
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createConjuge } from '@/app/services/create/CreateConjuge';
import toast from 'react-hot-toast';


type CreateParecerComercialModalProps = {
  title: string;
  clienteId: string;
  isMarried: boolean;
}

const createConjugeSchema = z.object({
  nome: z.string().nonempty('Nome não pode ser em branco.'),
  cpf: z.string()
    .nonempty('CPF não pode ser em branco.')
    .min(11, 'CPF deve ter 11 dígitos.')
    .max(11, 'CPF deve ter 11 dígitos.'),
  rg: z.string().nonempty('RG não pode ser em branco.'),
  orgaoExpedidor: z.string().nonempty('Órgão Expedidor não pode ser em branco.'),
  dataNascimento: z.string().nonempty('Data de nascimento não pode ser em branco.'),
});


type CreateConjugeSchema = z.infer<typeof createConjugeSchema>;
export default function CreateConjugeModal({ title, clienteId, isMarried }: CreateParecerComercialModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createConjuge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      setIsOpen(false);
      toast.success('Conjuge criado com sucesso.');
    },
    onError: (error) => {
      toast.error('Erro ao criar conjuge');
    },
  });

  const { register, handleSubmit, formState: { errors } } = useForm<CreateConjugeSchema>({
    resolver: zodResolver(createConjugeSchema),
  });

  const handleFormSubmit = async (data: CreateConjugeSchema) => {
    setIsOpen(false); 

    await mutation.mutateAsync({
      nome: data.nome,
      cpf: data.cpf,
      rg: data.rg,
      orgaoExpedidor: data.orgaoExpedidor,
      dataNascimento: data.dataNascimento,
      clienteId 
    });
  };
  

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(true)}
        disabled={isMarried}
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
              <Input<CreateConjugeSchema>
                label="Nome"
                name="nome"
                register={register}
                errors={errors}
                placeholder="Digite o nome do conjuge"
              />
              <Input<CreateConjugeSchema>
                label="CPF"
                name="cpf"
                register={register}
                errors={errors}
                placeholder="Insisra o CPF do conjuge"
              />
              <Input<CreateConjugeSchema>
                label="RG"
                name="rg"
                register={register}
                errors={errors}
                placeholder="Insira o RG do conjuge"
              />
              <Input<CreateConjugeSchema>
                label="Orgão Exoeditor"
                name="orgaoExpedidor"
                register={register}
                errors={errors}
                placeholder="Insira o orgão expeditor"
              />
              <Input<CreateConjugeSchema>
                label="Data de Nascimento"
                name="dataNascimento"
                type='date'
                register={register}
                errors={errors}
                placeholder="Digite o nome do conjuge"
              />
            <button
              className="px-4 py-2 bg-emerald-700  text-white rounded hover:bg-emerald-800 transition"
              type="submit"
              disabled={isMarried}
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
