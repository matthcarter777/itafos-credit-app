'use client'

import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '../Input/Input';
import { useState } from 'react'
import { Toast } from '../Toast/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProduto } from '@/app/services/create/CreateProduto';
import Select from '../Select/Select';
import { Produto } from '@/app/types/Produto';
import { getProdutos } from '@/app/services/hooks/getProdutos';
import { createItemProposta } from '@/app/services/create/CreateItemProposta';
import { Plus } from 'lucide-react';


type CreateItemPropostaModalProps = {
  title: string;
  propostaId: string;
}

const createItemPropostaSchema = z.object({
  quantidade: z.coerce.number()
    .min(1, "Informe uma quantidade válida (mínimo de 1)."),
  valorTon: z.coerce.number()
    .min(1, "Informe o valor por tonelada (mínimo de R$ 1,00)."),
  freteTon: z.coerce.number()
    .min(1, "Informe o valor do frete por tonelada (mínimo de R$ 1,00)."),
  valorCredito: z.coerce.number()
    .min(1, "Informe o valor de crédito concedido (mínimo de R$ 1,00)."),
  tipoFrete: z.string()
    .nonempty("Selecione o tipo de frete (CIF ou FOB)."),
  tipoOperacao: z.string()
    .nonempty("Selecione o tipo de operação."),
  vencimento: z.string()
    .nonempty("Selecione uma data de vencimento."),
  produtoId: z.string()
    .nonempty("Selecione o produto correspondente."),
});


type CreateItemPropostaSchema = z.infer<typeof createItemPropostaSchema>;
export default function CreateItemPropostaModal({ title, propostaId }: CreateItemPropostaModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const queryClient = useQueryClient();

  const produtos = useQuery<Produto[]>({ queryKey: ['propostas'], queryFn: getProdutos });

  const mutation = useMutation({
    mutationFn: createItemProposta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['propostas'] });
      setShowToast(true);
      setIsOpen(false);
    },
    onError: (error) => {
      console.error('Erro ao criar RTV:', error);
    },
  });

  const tipoFreteOptions = [
    {id: "CIF", nome: "CIF"},
    {id: "FOB", nome: "FOB"},
  ]

  const tipoOperacaoOptions = [
    {id: "Curto Prazo", nome: "Curto Prazo"},
    {id: "Longo Prazo", nome: "Longo Prazo"},
  ]

  const { register, handleSubmit, formState: { errors } } = useForm<CreateItemPropostaSchema>({
    resolver: zodResolver(createItemPropostaSchema),
  });

  const handleFormSubmit = async (data: CreateItemPropostaSchema) => {
    setIsOpen(false); 

    await mutation.mutateAsync({
      quantidade: data.quantidade,
      valorTon: data.valorTon,
      valorCredito: data.valorCredito,
      freteTon: data.freteTon,
      tipoFrete: data.tipoFrete,
      tipoOperacao: data.tipoOperacao,
      vencimento: data.vencimento,
      produtoId: data.produtoId, 
      propostaId: propostaId, 
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
              <Select<CreateItemPropostaSchema>
                label="Produto"
                name="produtoId"
                register={register}
                errors={errors}
                options={produtos.data || []}
              />
              <Input<CreateItemPropostaSchema>
                label="Quantidade"
                name="quantidade"
                type="number"
                register={register}
                errors={errors}
                placeholder="Insira a quantidade"
              />
              <Input<CreateItemPropostaSchema>
                label="Valor Por Tonelada"
                name="valorTon"
                type="number"
                register={register}
                errors={errors}
                placeholder="Insira o valor"
              />
              <Select<CreateItemPropostaSchema>
                label="Tipo de Frete"
                name="tipoFrete"
                register={register}
                errors={errors}
                options={tipoFreteOptions}
              />
              <Input<CreateItemPropostaSchema>
                label="Valor Frete por Tonelada"
                name="freteTon"
                type="number"
                register={register}
                errors={errors}
                placeholder="Insira o valor"
              />
              <Input<CreateItemPropostaSchema>
                label="Valor Credito"
                name="valorCredito"
                type="number"
                register={register}
                errors={errors}
                placeholder="Insira o valor"
              />
              <Select<CreateItemPropostaSchema>
                label="Tipo de Operação"
                name="tipoOperacao"
                register={register}
                errors={errors}
                options={tipoOperacaoOptions}
              />
              <Input<CreateItemPropostaSchema>
                label="Vencimento"
                name="vencimento"
                type="date"
                register={register}
                errors={errors}
                placeholder="Insira o valor"
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
