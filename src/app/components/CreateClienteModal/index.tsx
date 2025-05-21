'use client'

import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '../Input/Input';
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Select from '../Select/Select';
import { createCliente } from '@/app/services/create/CreateCliente';
import toast from 'react-hot-toast';


type CreateProdutoModalProps = {
  title: string;
  queryId: string;
}

const createClienteSchema = z.object({
  nomeCliente: z.string().nonempty('O Nome do cliente não pode ser em branco.'),
  tipoCliente: z.string().nonempty('O tipo de cliente não pode ser em branco.'),
  cpfcnpj: z.string().nonempty('O CPF/CNPJ não pode ser em branco.')
    .min(11, 'CPF/CNPJ deve ter 11 dígitos.')
    .max(11, 'CPF/CNPJ deve ter 11 dígitos.'),
  ie: z.string().nullable().optional(),
  dataConstituicao: z.string().nullable().optional(),
  regTrib: z.string().nullable().optional(),
  telefone: z.string().nullable().optional(),
  dataNascimento: z.string().nullable().optional(),
  estadoCivil: z.string().nullable().optional(),
  email: z.string().nonempty('Email para login obrigatório'),
  senha: z.string().nonempty('Senha para login obrigatória'),
});

type CreateClienteSchema = z.infer<typeof createClienteSchema>;
export default function CreateProdutoModal({ title, queryId }: CreateProdutoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${queryId}`] });
      setShowToast(true);
      setIsOpen(false);
      toast.success('Atividade criada com sucesso.');
    },
    onError: (error) => {
      console.error('Erro ao criar RTV:', error);
    },
  });

  const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateClienteSchema>({
    resolver: zodResolver(createClienteSchema),
  });

  const handleFormSubmit = async (data: CreateClienteSchema) => {
    const transformedData = {
      ...data,
      ie: data.ie ?? undefined,
      dataConstituicao: data.dataConstituicao ?? undefined,
      regTrib: data.regTrib ?? undefined,
      telefone: data.telefone ?? undefined,
      dataNascimento: data.dataNascimento ?? undefined,
      estadoCivil: data.estadoCivil ?? undefined,
    };
  
    await mutation.mutateAsync(transformedData);
  };
  
  const tipoClienteOptions = [
    {id: "Pessoa Fisica", nome: "Pessoa Fisica"},
    {id: "Pessoa Juridica", nome: "Pessoa Juridica"},
  ]

  const estadoCivilOptions = [
    {id: "Casado(a)", nome: "Casado(a)"},
    {id: "Solteiro(a)", nome: "Solteiro(a)"},
  ]

  const regTributOptions = [
    {id: "Simples Nacional", nome: "Simples Nacional"},
    {id: "Lucro Presumido", nome: "Lucro Presumido"},
    {id: "Lucro Real", nome: "Lucro Real"},
    {id: "Produtor Rural (Com IE)", nome: "Produtor Rural (Com IE)"},
    {id: "Produtor Rural (Sem IE)", nome: "Produtor Rural (Sem IE)"},
  ]

  const tipoCliente = watch("tipoCliente");
  const isPessoaFisica = tipoCliente === "Pessoa Fisica";

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
            className="bg-gray-300 p-6 rounded shadow-lg w-full max-w-md flex flex-col gap-3 max-h-[90vh] overflow-y-auto scrollbar-hide" 
            onSubmit={handleSubmit(handleFormSubmit)} >
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <Input<CreateClienteSchema>
              label="Nome do Cliente"
              name="nomeCliente"
              register={register}
              errors={errors}
              placeholder="Ex: João da Silva"
            />

            <Select<CreateClienteSchema>
              label="Tipo de Cliente"
              name="tipoCliente"
              register={register}
              errors={errors}
              options={tipoClienteOptions}
            />

            <Input<CreateClienteSchema>
              label="CPF - CNPJ"
              name="cpfcnpj"
              type="number"
              register={register}
              errors={errors}
              placeholder="Ex: 12345678900 ou 12345678000100"
            />

            <Input<CreateClienteSchema>
              label="Inscrição Estadual"
              name="ie"
              type="number"
              register={register}
              errors={errors}
              placeholder="Ex: 123456"
            />

            <Input<CreateClienteSchema>
              label="Data Constituição"
              name="dataConstituicao"
              type="date"
              register={register}
              errors={errors}
              placeholder="Selecione a data"
            />

            <Select<CreateClienteSchema>
              label="Regime Tributario"
              name="regTrib"
              register={register}
              errors={errors}
              options={regTributOptions}
            />

            <Input<CreateClienteSchema>
              label="Telefone"
              name="telefone"
              type="number"
              register={register}
              errors={errors}
              placeholder="Ex: (11) 91234-5678"
            />

            { isPessoaFisica && (
              <Input<CreateClienteSchema>
                label="Data de Nascimento"
                name="dataNascimento"
                type="date"
                register={register}
                errors={errors}
                placeholder="Selecione a data de nascimento"
              />
            )}

            { isPessoaFisica && (
              <Select<CreateClienteSchema>
                label="Estado Civil"
                name="estadoCivil"
                register={register}
                errors={errors}
                options={estadoCivilOptions}
              />
            )}

            <h2 className="text-xl font-bold mb-4">Login</h2>
              
            <Input<CreateClienteSchema>
              label="Email"
              name="email"
              type="email"
              register={register}
              errors={errors}
              placeholder="Ex: usuario@empresa.com"
            />

            <Input<CreateClienteSchema>
              label="Senha"
              name="senha"
              type="password"
              register={register}
              errors={errors}
              placeholder="Digite a senha"
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
