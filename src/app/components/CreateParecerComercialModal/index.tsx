'use client'

import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '../Input/Input';
import { useState } from 'react'
import { Toast } from '../Toast/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Select from '../Select/Select';
import Textarea from '../Textarea/intex';
import { createParecerComercial } from '@/app/services/create/CreateParecerComercial';


type CreateParecerComercialModalProps = {
  title: string;
  clientId: string;
}

const createParecerComercialSchema = z.object({
  conceitoComercial: z.string().nonempty('Selecione o conceito comercial.'),
  atividadePrincipal: z.string().nonempty('Prencha a ativididade principal.'),
  dataAtividadePrincipal: z.string().nonempty('Prencha a data da ativididade principal.'),
  evoluAtivPrin: z.string().nonempty('Prencha a data da ativididade principal.'),
  observacao: z.string().nonempty('Prencha a data da ativididade principal.'),
});

type CreateParecerComercialSchema = z.infer<typeof createParecerComercialSchema>;
export default function CreateProdutoModal({ title, clientId }: CreateParecerComercialModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createParecerComercial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['propostas'] });
      setShowToast(true);
      setIsOpen(false);
    },
    onError: (error) => {
      console.error('Erro ao criar RTV:', error);
    },
  });

  const { register, handleSubmit, formState: { errors } } = useForm<CreateParecerComercialSchema>({
    resolver: zodResolver(createParecerComercialSchema),
  });

  const handleFormSubmit = async (data: CreateParecerComercialSchema) => {
    setIsOpen(false); 

    console.log(data)

    await mutation.mutateAsync({
      atividadePrincipal: data.atividadePrincipal,
      conceitoComercial: data.conceitoComercial,
      evoluAtivPrin: data.evoluAtivPrin,
      dataAtividadePrincipal: data.dataAtividadePrincipal,
      observacao: data.observacao,
      clienteId: clientId,
      rtvId: '87840d25-5715-4059-9746-fcb0445f1b54'
    });
  };
  
  const conceitoComercialOptions = [
    {id: "Ruim", nome: "Ruim"},
    {id: "Regular", nome: "Regular"},
    {id: "Bom", nome: "Bom"},
    {id: "Excelente", nome: "Excelente"},
    {id: "Não sei dizer", nome: "Não sei dizer"},
  
  ]

  const exercAtivOptions = [
    {id: "Entre -15% e 15%", nome: "Entre -15% e 15%"},
    {id: "Redução superior a 15% justificado", nome: "Redução superior a 15% justificado"},
    {id: "Redução superior a 15% não justificado", nome: "Redução superior a 15% não justificado"},
    {id: "Crescimento superior a 15% justificado", nome: "Crescimento superior a 15% justificado"},
    {id: "Crescimento superior a  15% não justificado", nome: "Crescimento superior a  15% não justificado"},
    {id: "Não sei dizer", nome: "Não sei dizer"},
  ]

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
              <Select<CreateParecerComercialSchema>
                label="Conceito Comercial"
                name="conceitoComercial"
                register={register}
                errors={errors}
                options={conceitoComercialOptions}
              />
              <Input<CreateParecerComercialSchema>
                label="Qual é a Atividade Principal?"
                name="atividadePrincipal"
                register={register}
                errors={errors}
                placeholder="Digite a atividade principal"
              />
              <Input<CreateParecerComercialSchema>
                label="Exerce a Atividade Principal desde?"
                type='date'
                name="dataAtividadePrincipal"
                register={register}
                errors={errors}
                placeholder="Digite a atividade principal"
              />
              <Select<CreateParecerComercialSchema>
                label="Evolução da Atividade nos Últimos Três Anos"
                name="evoluAtivPrin"
                register={register}
                errors={errors}
                options={exercAtivOptions}
              />
              <Textarea<CreateParecerComercialSchema>
                label="Observações da Equipe de Vendas"
                name="observacao"
                register={register}
                errors={errors}
                placeholder="Digite as observações"
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
