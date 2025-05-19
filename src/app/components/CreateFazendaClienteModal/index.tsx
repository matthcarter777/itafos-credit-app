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
import { createFazendaCliente } from '@/app/services/create/CreateFazendaCliente';



type CreateFazendaClienteModalProps = {
  title: string;
  clienteId: string;
  queryId: string;
}

const createEnderecoClienteSchema = z.object({
  nome: z.string().nonempty('O nome é obrigatório.'),
  uf: z.string().nonempty('A UF (estado) é obrigatória.'),
  cidade: z.string().nonempty('A cidade é obrigatória.'),
  quantHectares: z.string().nonempty('A quantidade de hectares é obrigatória.'),
  tipoArea: z.string().nonempty('O tipo de área é obrigatório.'),
  matricula: z.string().nonempty('A matrícula é obrigatória.'),
  tipoSolo: z.string().nonempty('O tipo de solo é obrigatório.'),
  ie: z.string().nullable().optional(),
  tipoPagamento: z.string().nullable().optional(),
  tipoProprietario: z.string().nullable().optional(),
  nomeProprietario: z.string().nullable().optional(),
  vencimentoContrato: z.string().nullable().optional(),
  cpfcnpj: z
    .string()
    .nullable()
    .optional()
    .refine((val) => !val || /^\d{11}$/.test(val), {
      message: 'O CPF deve conter exatamente 11 dígitos numéricos.',
    }),
  produto: z.string().nullable().optional(),
  taxaContrato: z.string().nullable().optional(),
});


type CreateEnderecoClienteSchema = z.infer<typeof createEnderecoClienteSchema>;
export default function CreateFazendaClienteModal({ title, clienteId, queryId }: CreateFazendaClienteModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const estados = useQuery<Estado[]>({ queryKey: ['estados'], queryFn: getEstados });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createFazendaCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${queryId}`] });
      setShowToast(true);
      setIsOpen(false);
    },
    onError: (error) => {
      setShowToast(true);
      console.error('Erro ao criar RTV:', error);
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

  const tipoAreaOptions = [
    {id: "Própria", nome: "Própria"},
    {id: "Arrendada", nome: "Arrendada"},
  ]

  const tipoProprietarioOptions = [
    {id: "Pessoa Fisica", nome: "Pessoa Fisica"},
    {id: "Pessoa Juridica", nome: "Pessoa Juridica"},
  ]

  const tipoPagamentoOptions = [
    {id: "Dinheiro", nome: "Dinheiro"},
    {id: "Produto", nome: "Produto"},
  ]

  const tipoArea = watch("tipoArea");
  const isArrendada = tipoArea === "Arrendada";

  const tipoPagamento = watch("tipoPagamento");
  const isProduto  = tipoPagamento === "Produto";
  const isDinheiro = tipoPagamento === "Dinheiro";
  

  const handleFormSubmit = async (data: CreateEnderecoClienteSchema) => {
    setIsOpen(false); 
  
    await mutation.mutateAsync({
      clienteId,
      nome: data.nome,
      cidade: data.cidade,
      uf: data.uf,
      quantHectares: Number(data.quantHectares),
      tipoArea: data.tipoArea,
      ie: data.ie ?? undefined,
      matricula: data.matricula,
      nomeProprietario: data.nomeProprietario ?? undefined,
      tipoProprietario: data.tipoProprietario ?? undefined,
      cpfcnpj: data.cpfcnpj ?? undefined,
      vencimentoContrato: data.vencimentoContrato ?? undefined,
      tipoPagamento: data.tipoPagamento ?? undefined,
      produto: data.produto ?? undefined,
      taxaContrato: Number(data.taxaContrato) ?? undefined,
      tipoSolo: data.tipoSolo ?? undefined,
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
            className="bg-gray-300 p-6 rounded shadow-lg w-full max-w-md flex flex-col gap-3 max-h-[90vh] overflow-y-auto scrollbar-hide" 
            onSubmit={handleSubmit(handleFormSubmit)} >
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <Input<CreateEnderecoClienteSchema>
              label="Nome da fazenda"
              name="nome"
              register={register}
              errors={errors}
              placeholder="Digite o nome da fazenda"
            />

            <Select<CreateEnderecoClienteSchema>
              label="UF"
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
              label="Quantidade de hectares"
              name="quantHectares"
              register={register}
              errors={errors}
              placeholder="Digite a quantidade de hectares"
            />

            <Select<CreateEnderecoClienteSchema>
              label="Tipo de área"
              name="tipoArea"
              register={register}
              errors={errors}
              options={tipoAreaOptions}
            />

            <Input<CreateEnderecoClienteSchema>
              label="Número da matrícula"
              name="matricula"
              register={register}
              errors={errors}
              placeholder="Digite o número da matrícula"
            />

            <Input<CreateEnderecoClienteSchema>
              label="Tipo de solo"
              name="tipoSolo"
              register={register}
              errors={errors}
              placeholder="Digite o tipo de solo"
            />

            <Input<CreateEnderecoClienteSchema>
              label="IE"
              name="ie"
              register={register}
              errors={errors}
              placeholder="Inscrição Estadual (opcional)"
            />
            { isArrendada && (
              <>
                <Select<CreateEnderecoClienteSchema>
                  label="Tipo de proprietário"
                  name="tipoProprietario"
                  register={register}
                  errors={errors}
                  options={tipoProprietarioOptions}
                />

                <Input<CreateEnderecoClienteSchema>
                  label="Nome do proprietário"
                  name="nomeProprietario"
                  register={register}
                  errors={errors}
                  placeholder="Digite o nome do proprietário"
                />

                <Input<CreateEnderecoClienteSchema>
                  label="CPF ou CNPJ"
                  name="cpfcnpj"
                  register={register}
                  errors={errors}
                  placeholder="Digite o CPF ou CNPJ"
                />

                <Input<CreateEnderecoClienteSchema>
                  label="Vencimento do contrato"
                  type="date"
                  name="vencimentoContrato"
                  register={register}
                  errors={errors}
                  placeholder="Selecione a data de vencimento"
                />

                <Select<CreateEnderecoClienteSchema>
                  label="Tipo de pagamento"
                  name="tipoPagamento"
                  register={register}
                  errors={errors}
                  options={tipoPagamentoOptions}
                />

                { isProduto && (
                  <Input<CreateEnderecoClienteSchema>
                    label="Produto"
                    name="produto"
                    register={register}
                    errors={errors}
                    placeholder="Informe o produto"
                    />
                )}
                
                { isDinheiro && (
                  <Input<CreateEnderecoClienteSchema>
                    label="Taxa do contrato"
                    name="taxaContrato"
                    register={register}
                    errors={errors}
                    placeholder="Digite a taxa do contrato"
                    />
                )}
              </>
            )}
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
