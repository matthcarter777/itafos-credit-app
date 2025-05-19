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
import { createEnderecoCliente } from '@/app/services/create/CreateEnderecoCliente';
import toast from 'react-hot-toast';


type CreateEnderecoClienteModalProps = {
  title: string;
  clienteId: string;
  queryId: string;
}

const createEnderecoClienteSchema = z.object({
  logradouro: z.string().nonempty('O logradouro é obrigatório.'),
  numero: z.string().nullable().optional(),
  uf: z.string().nonempty('O estado (UF) é obrigatório.'),
  cidade: z.string().nonempty('A cidade é obrigatória.'),
  bairro: z.string().nonempty('O bairro é obrigatório.'),
  cep: z.string().nonempty('O CEP é obrigatório.'),
  complemento: z.string().nonempty('O complemento é obrigatório.'),
});


type CreateEnderecoClienteSchema = z.infer<typeof createEnderecoClienteSchema>;
export default function CreateEnderecoClienteModal({ title, clienteId, queryId }: CreateEnderecoClienteModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const estados = useQuery<Estado[]>({ queryKey: ['estados'], queryFn: getEstados });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createEnderecoCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${queryId}`] });
      setIsOpen(false);
      toast.success('Endereço cadastrado com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao cadastrado endereço.');
    },
  });

  const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateEnderecoClienteSchema>({
    resolver: zodResolver(createEnderecoClienteSchema),
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
  

  const handleFormSubmit = async (data: CreateEnderecoClienteSchema) => {
    setIsOpen(false); 
  
    await mutation.mutateAsync({
      clienteId,
      logradouro: data.logradouro,
      numero: data.numero || null,
      bairro: data.bairro,
      cep: data.cep,
      cidade: data.cidade,
      uf: data.uf,
      complemento: data.complemento,
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
            <Select<CreateEnderecoClienteSchema>
              label="Estado (UF)"
              name="uf"
              register={register}
              errors={errors}
              options={estados.data || []}
            />

            <Select<CreateEnderecoClienteSchema>
              label="Cidade"
              name="cidade"
              register={register}
              errors={errors}
              options={municipios.data || []}
            />

            <Input<CreateEnderecoClienteSchema>
              label="Endereço"
              name="logradouro"
              register={register}
              errors={errors}
              placeholder="Ex: Rua das Flores, Avenida Brasil"
            />

            <Input<CreateEnderecoClienteSchema>
              label="CEP"
              name="cep"
              register={register}
              errors={errors}
              placeholder="Digite o CEP (somente números)"
            />

            <Input<CreateEnderecoClienteSchema>
              label="Bairro"
              name="bairro"
              register={register}
              errors={errors}
              placeholder="Digite o nome do bairro"
            />

            <Input<CreateEnderecoClienteSchema>
              label="Número"
              type="number"
              name="numero"
              register={register}
              errors={errors}
              placeholder="Número da residência (opcional)"
            />

            <Input<CreateEnderecoClienteSchema>
              label="Complemento"
              name="complemento"
              register={register}
              errors={errors}
              placeholder="Ex: Apto 101, Fundos, Bloco B"
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
