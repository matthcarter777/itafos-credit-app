'use client'

import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '../Input/Input';
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Select from '../Select/Select';
import toast from 'react-hot-toast';
import { updateCliente } from '@/app/services/update/UpdateCliente';
import { Cliente } from '@/app/types/Cliente';


type CreateProdutoModalProps = {
  queryId: string;
  data?: Cliente;
  icon?: ReactNode;
}

const updateClienteSchema = z.object({
  nomeCliente: z.string().optional().refine(val => val === undefined || val.trim() !== '', {
    message: 'O Nome do cliente não pode ser em branco.',
  }),
  tipoCliente: z.string().optional().refine(val => val === undefined || val.trim() !== '', {
    message: 'O tipo de cliente não pode ser em branco.',
  }),
  cpfcnpj: z
    .string()
    .optional()
    .refine(val => {
      if (val === undefined) return true;
      return val.length === 11 || val.length === 14;
    }, {
      message: 'CPF deve ter 11 dígitos ou CNPJ 14 dígitos.',
    }),
  ie: z.string().nullable().optional(),
  dataConstituicao: z.string().nullable().optional(),
  regTrib: z.string().nullable().optional(),
  telefone: z.string().nullable().optional(),
  dataNascimento: z.string().nullable().optional(),
  estadoCivil: z.string().nullable().optional()
});


type UpdateClienteSchema = z.infer<typeof updateClienteSchema>;
export default function UpdateClienteModal({ queryId, data, icon }: CreateProdutoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${queryId}`] });
      setIsOpen(false);
      toast.success('Cliente atualizado com sucesso.');
    },
    onError: (error) => {
      console.error('Erro ao criar RTV:', error);
    },
  });

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<UpdateClienteSchema>({
    resolver: zodResolver(updateClienteSchema),
    defaultValues: {
      nomeCliente: data?.nomeCliente ?? '',
      tipoCliente: data?.tipoCliente ?? '',
      cpfcnpj: data?.cpfcnpj ?? '',
      ie: data?.ie ?? '',
      dataConstituicao: data?.dataConstituicao ?? '',
      regTrib: data?.regTrib ?? '',
      telefone: data?.telefone ?? '',
      dataNascimento: data?.dataNascimento ?? '',
      estadoCivil: data?.estadoCivil ?? ''
    },
  });

  useEffect(() => {
  if (data) {
      reset({
        nomeCliente: data.nomeCliente ?? '',
        tipoCliente: data.tipoCliente ?? '',
        cpfcnpj: data.cpfcnpj ?? '',
        ie: data.ie ?? '',
        dataConstituicao: data.dataConstituicao ?? '',
        regTrib: data.regTrib ?? '',
        telefone: data.telefone ?? '',
        dataNascimento: data.dataNascimento ?? '',
        estadoCivil: data.estadoCivil ?? ''
      });
    }
  }, [data, reset]);


  const handleFormSubmit = async (formData: UpdateClienteSchema) => {
    if (!data?.id) {
      toast.error("ID do cliente não encontrado.");
      return;
    }

    const transformedData = {
      id: data.id,
      ...formData,
      ie: formData.ie ?? undefined,
      dataConstituicao: formData.dataConstituicao ?? undefined,
      regTrib: formData.regTrib ?? undefined,
      telefone: formData.telefone ?? undefined,
      dataNascimento: formData.dataNascimento ?? undefined,
      estadoCivil: formData.estadoCivil ?? undefined,
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
  const isPessoaFisica = useMemo(() => tipoCliente === "Pessoa Fisica", [tipoCliente]);

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
        { icon }
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <form 
            className="bg-gray-300 p-6 rounded shadow-lg w-full max-w-md flex flex-col gap-3 max-h-[90vh] overflow-y-auto scrollbar-hide" 
            onSubmit={handleSubmit(handleFormSubmit)} >
            <h2 className="text-xl font-bold mb-4">Atualizar Cliente</h2>
            <Input<UpdateClienteSchema>
              label="Nome do Cliente"
              name="nomeCliente"
              register={register}
              errors={errors}
            />

            <Select<UpdateClienteSchema>
              label="Tipo de Cliente"
              name="tipoCliente"
              register={register}
              errors={errors}
              options={tipoClienteOptions}
            />

            <Input<UpdateClienteSchema>
              label="CPF - CNPJ"
              name="cpfcnpj"
              type="number"
              register={register}
              errors={errors}
            />

            <Input<UpdateClienteSchema>
              label="Inscrição Estadual"
              name="ie"
              type="number"
              register={register}
              errors={errors}
            />

            <Input<UpdateClienteSchema>
              label="Data Constituição"
              name="dataConstituicao"
              type="date"
              register={register}
              errors={errors}
            />

            <Select<UpdateClienteSchema>
              label="Regime Tributario"
              name="regTrib"
              register={register}
              errors={errors}
              options={regTributOptions}
            />

            <Input<UpdateClienteSchema>
              label="Telefone"
              name="telefone"
              type="number"
              register={register}
              errors={errors}
            />

            { isPessoaFisica && (
              <Input<UpdateClienteSchema>
                label="Data de Nascimento"
                name="dataNascimento"
                type="date"
                register={register}
                errors={errors}
              />
            )}

            { isPessoaFisica && (
              <Select<UpdateClienteSchema>
                label="Estado Civil"
                name="estadoCivil"
                register={register}
                errors={errors}
                options={estadoCivilOptions}
              />
            )}
            <button
              className="px-4 py-2 bg-emerald-700 text-white rounded hover:bg-emerald-800 transition disabled:opacity-50"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Salvando...' : 'Salvar'}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              type='button'
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