'use client'

import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '../Input/Input';
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getEstados } from '@/app/services/hooks/getEstados';
import Select from '../Select/Select';
import { Estado } from '@/app/types/Estado';
import { Municipio } from '@/app/types/Municipio';
import { getMunicipios } from '@/app/services/hooks/getMunicipio';
import { createReferenciaCliente } from '@/app/services/create/CreateReferenciaCliente';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';



type CreateReferenciaClienteModalProps = {
  title: string;
  clienteId: string;
  queryId: string;
}

const createReferenciaClienteSchema = z.object({
  nome: z.string().nonempty('O nome é obrigatório.'),
  cpfcnpj: z.string().nonempty('CPF não pode ser em branco.')
  .min(11, 'CPF deve ter 11 dígitos.')
  .max(11, 'CPF deve ter 11 dígitos.'),
  uf: z.string().nonempty('A UF (estado) é obrigatória.'),
  cidade: z.string().nonempty('A cidade é obrigatória.'),
  telefone: z.string().nonempty('O telefone é obrigatório.'),
});

type CreateReferenciaClienteSchema = z.infer<typeof createReferenciaClienteSchema>;
export default function CreateReferenciaClienteModal({ title, clienteId, queryId }: CreateReferenciaClienteModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const estados = useQuery<Estado[]>({ queryKey: ['estados'], queryFn: getEstados });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createReferenciaCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${queryId}`] });
      setIsOpen(false);
      toast.success('Referencia cadastrada com sucesso.')
    },
    onError: (error) => {
      toast.error('Erro ao criar Referencia');
    },
  });

  const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateReferenciaClienteSchema>({
    resolver: zodResolver(createReferenciaClienteSchema),
  });

  const estadoSelect = watch("uf");

  const municipios = useQuery<Municipio[]>({
    queryKey: ['municipio', estadoSelect],
    queryFn: async () => {
      if (!estadoSelect) throw new Error('ID da proposta não definido');
      return await getMunicipios(estadoSelect);
    },
    enabled: !!estadoSelect, 
  });
  

  const handleFormSubmit = async (data: CreateReferenciaClienteSchema) => {
    setIsOpen(false); 
  
    await mutation.mutateAsync({
      clienteId,
      nome: data.nome,
      cpfcnpj: data.cpfcnpj,
      telefone: data.telefone,
      cidade: data.cidade,
      uf: data.uf
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
        <Plus />
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <form 
            className="bg-gray-300 p-6 rounded shadow-lg w-full max-w-md flex flex-col gap-3" 
            onSubmit={handleSubmit(handleFormSubmit)} >
            <h2 className="text-xl font-bold mb-4">{title}</h2>
              <Input<CreateReferenciaClienteSchema>
                label="Nome"
                name="nome"
                register={register}
                errors={errors}
                placeholder="Digite o nome"
              />
              <Input<CreateReferenciaClienteSchema>
                label="CPF | CNPJ"
                name="cpfcnpj"
                register={register}
                errors={errors}
                placeholder="Digite o CPF ou CNPJ"
              />
              <Input<CreateReferenciaClienteSchema>
                label="Telefone"
                name="telefone"
                register={register}
                errors={errors}
                placeholder="Digite o telefone"
              />
              <Select<CreateReferenciaClienteSchema>
              label="UF"
              name="uf"
              register={register}
              errors={errors}
              options={estados.data || []}
            />
            <Select<CreateReferenciaClienteSchema>
              label="Cidade"
              name="cidade"
              register={register}
              errors={errors}
              options={municipios.data || []}
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
