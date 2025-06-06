'use client'

import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '../Input/Input';
import { ReactNode, useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Select from '../Select/Select';
import toast from 'react-hot-toast';
import { updateFazendaCliente } from '@/app/services/update/UpdateFazendaCliente';
import { ItemProposta } from '@/app/types/ItemProposta';
import { Produto } from '@/app/types/Produto';
import { getProdutos } from '@/app/services/hooks/getProdutos';
import { updateItemProposta } from '@/app/services/update/UpdateItemProposta';

type UpdateItemPropostaModalProps = {
  propostaId: string;
  queryId: string;
  data?: ItemProposta;
  icon?: ReactNode;
};


const updateItemPropostaSchema = z.object({
  quantidade: z.coerce.number()
    .min(1, "Informe uma quantidade válida (mínimo de 1).")
    .optional(),
    
  valorTon: z.coerce.number()
    .min(1, "Informe o valor por tonelada (mínimo de R$ 1,00).")
    .optional(),

  freteTon: z.coerce.number()
    .min(1, "Informe o valor do frete por tonelada (mínimo de R$ 1,00).")
    .optional(),

  valorCredito: z.coerce.number()
    .min(1, "Informe o valor de crédito concedido (mínimo de R$ 1,00).")
    .optional(),

  tipoFrete: z.string()
    .min(1, "Selecione o tipo de frete (CIF ou FOB).")
    .optional(),

  tipoOperacao: z.string()
    .min(1, "Selecione o tipo de operação.")
    .optional(),

  vencimento: z.string()
    .min(1, "Selecione uma data de vencimento.")
    .optional(),

  produtoId: z.string()
    .min(1, "Selecione o produto correspondente.")
    .optional(),
});

export type UpdateItemPropostaSchema = z.infer<typeof updateItemPropostaSchema>;

export default function UpdateItemPropostaModal({ queryId, data, icon, propostaId }: UpdateItemPropostaModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: updateItemProposta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${queryId}`] });
      setIsOpen(false);
      toast.success('Item atualizado com sucesso.');
    },
    onError: (error) => {
      console.error('Erro ao atualizar item:', error);
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateItemPropostaSchema>({
    resolver: zodResolver(updateItemPropostaSchema),
  });


  useEffect(() => {
    if (data) {
      reset({
        quantidade: data.quantidade,
        valorTon: data.valorTon,
        freteTon: data.freteTon,
        valorCredito: data.valorCredito,
        tipoFrete: data.tipoFrete,
        tipoOperacao: data.tipoOperacao,
        vencimento: data.vencimento,
        produtoId: data.produtoId,
      });
    }
  }, [data, reset]);


  const queryClient = useQueryClient();

  const produtos = useQuery<Produto[]>({ queryKey: ['propostas'], queryFn: getProdutos });

  const handleFormSubmit = async (formData: UpdateItemPropostaSchema) => {
    if (!data?.id) {
      toast.error("ID da fazenda não encontrado.");
      return;
    }

    await mutation.mutateAsync({
      id: data.id,
      quantidade: Number(formData.quantidade) ?? undefined,
      valorTon: Number(formData.valorTon) ?? undefined,
      valorCredito: Number(formData.valorCredito) ?? undefined,
      freteTon: Number(formData.freteTon) ?? undefined,
      tipoFrete: formData.tipoFrete ?? "",
      tipoOperacao: formData.tipoOperacao ?? "",
      vencimento: formData.vencimento ?? "",
      produtoId: formData.produtoId ?? "", 
      propostaId: propostaId, 
    });
  };

  const tipoFreteOptions = [
    {id: "CIF", nome: "CIF"},
    {id: "FOB", nome: "FOB"},
  ]

  const tipoOperacaoOptions = [
    {id: "Curto Prazo", nome: "Curto Prazo"},
    {id: "Longo Prazo", nome: "Longo Prazo"},
  ]


  return (
    <div>
      <div className="relative">
        <button
          onClick={() => setIsOpen(true)}
          className="px-3 py-1 text-sm text-white bg-emerald-700 hover:bg-emerald-800 rounded"
        >
          {icon}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
          <form
            className="bg-gray-300 p-6 rounded shadow-lg w-full max-w-md flex flex-col gap-3 max-h-[90vh] overflow-y-auto scrollbar-hide"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <h2 className="text-xl font-bold mb-4">Atualizar Item do Pedido</h2>
            <Select<UpdateItemPropostaSchema>
              label="Produto"
              name="produtoId"
              register={register}
              errors={errors}
              options={produtos.data || []}
            />
            <Input<UpdateItemPropostaSchema>
              label="Quantidade"
              name="quantidade"
              type="number"
              register={register}
              errors={errors}
              placeholder="Insira a quantidade"
            />
            <Input<UpdateItemPropostaSchema>
              label="Valor Por Tonelada"
              name="valorTon"
              type="number"
              register={register}
              errors={errors}
              placeholder="Insira o valor"
            />
            <Select<UpdateItemPropostaSchema>
              label="Tipo de Frete"
              name="tipoFrete"
              register={register}
              errors={errors}
              options={tipoFreteOptions}
            />
            <Input<UpdateItemPropostaSchema>
              label="Valor Frete por Tonelada"
              name="freteTon"
              type="number"
              register={register}
              errors={errors}
              placeholder="Insira o valor"
            />
            <Input<UpdateItemPropostaSchema>
              label="Valor Credito"
              name="valorCredito"
              type="number"
              register={register}
              errors={errors}
              placeholder="Insira o valor"
            />
            <Select<UpdateItemPropostaSchema>
              label="Tipo de Operação"
              name="tipoOperacao"
              register={register}
              errors={errors}
              options={tipoOperacaoOptions}
            />
            <Input<UpdateItemPropostaSchema>
              label="Vencimento"
              name="vencimento"
              type="date"
              register={register}
              errors={errors}
              placeholder="Insira o valor"
            />
            
            <button type="submit" className="px-4 py-2 bg-emerald-700 text-white rounded hover:bg-emerald-800 transition disabled:opacity-50" disabled={mutation.isPending}>
              {mutation.isPending ? 'Salvando...' : 'Salvar'}
            </button>

            <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Fechar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
