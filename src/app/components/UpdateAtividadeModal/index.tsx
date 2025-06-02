'use client'

import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '../Input/Input';
import { ReactNode, useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Select from '../Select/Select';
import toast from 'react-hot-toast';
import { Fazenda } from '@/app/types/Fazenda';
import { updateFazendaCliente } from '@/app/services/update/UpdateFazendaCliente';
import { Municipio } from '@/app/types/Municipio';
import { getMunicipios } from '@/app/services/hooks/getMunicipio';
import { Estado } from '@/app/types/Estado';
import { getEstados } from '@/app/services/hooks/getEstados';

type UpdateFazendaModalProps = {
  queryId: string;
  data?: Fazenda;
  icon?: ReactNode;
};

export const updateFazendaSchema = z.object({
  nome: z.string().optional(),
  cidade: z.string().optional(),
  uf: z.string().optional(),
  quantHectares: z.string().nonempty('A quantidade de hectares é obrigatória.'),
  tipoArea: z.string().optional(),
  ie: z.string().nullable().optional(),
  matricula: z.string().optional(),
  nomeProprietario: z.string().nullable().optional(),
  tipoProprietario: z.string().nullable().optional(),
  tipoSolo: z.string().nullable().optional(),
  cpfcnpj: z
    .string()
    .nullable()
    .optional()
    .refine((val) => !val || /^\d{11}$|^\d{14}$/.test(val), {
      message: "O CPF deve conter 11 dígitos ou o CNPJ deve conter 14 dígitos numéricos.",
    }),
  vencimentoContrato: z.string().nullable().optional(),
  tipoPagamento: z.string().nullable().optional(),
  produto: z.string().nullable().optional(),
  taxaContrato: z.string().nullable().optional(),
});

export type UpdateFazendaSchema = z.infer<typeof updateFazendaSchema>;

export default function UpdateAtividadeModal({ queryId, data, icon }: UpdateFazendaModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const estados = useQuery<Estado[]>({ queryKey: ['estados'], queryFn: getEstados });

  const mutation = useMutation({
    mutationFn: updateFazendaCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${queryId}`] });
      setIsOpen(false);
      toast.success('Cliente atualizado com sucesso.');
    },
    onError: (error) => {
      console.error('Erro ao atualizar cliente:', error);
    },
  });

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<UpdateFazendaSchema>({
    resolver: zodResolver(updateFazendaSchema),
  });


  useEffect(() => {
    if (data) {
      reset({
        nome: data.nome ?? '',
        uf: data.uf ?? '',
        cidade: data.cidade ?? '',
        quantHectares: String(data.quantHectares) ?? '',
        tipoArea: data.tipoArea ?? '',
        matricula: data.matricula ?? '',
        tipoSolo: data.tipoSolo ?? '',
        ie: data.ie ?? '',
        tipoPagamento: data.tipoPagamento ?? '',
        tipoProprietario: data.tipoProprietario ?? '',
        nomeProprietario: data.nomeProprietario ?? '',
        vencimentoContrato: data.vencimentoContrato ?? '',
        cpfcnpj: data.cpfcnpj ?? '',
        produto: data.produto ?? '',
        taxaContrato: String(data.taxaContrato) ?? '',
      });
    }
  }, [data, reset]);

  const estadoSelect = watch("uf");

  const municipios = useQuery<Municipio[]>({
    queryKey: ['municipio', estadoSelect],
    queryFn: async () => {
      if (!estadoSelect) throw new Error('UF não definida');
      return await getMunicipios(estadoSelect);
    },
    enabled: !!estadoSelect,
  });

  const handleFormSubmit = async (formData: UpdateFazendaSchema) => {
    if (!data?.id) {
      toast.error("ID da fazenda não encontrado.");
      return;
    }

    await mutation.mutateAsync({
      id: data.id,
      clienteId: data.clienteId,
      nome: formData.nome,
      cidade: formData.cidade,
      uf: formData.uf,
      quantHectares: Number(formData.quantHectares),
      tipoArea: formData.tipoArea,
      ie: formData.ie ?? undefined,
      matricula: formData.matricula,
      nomeProprietario: formData.nomeProprietario ?? undefined,
      tipoProprietario: formData.tipoProprietario ?? undefined,
      cpfcnpj: formData.cpfcnpj ?? undefined,
      vencimentoContrato: formData.vencimentoContrato ?? undefined,
      tipoPagamento: formData.tipoPagamento ?? undefined,
      produto: formData.produto ?? undefined,
      taxaContrato: Number(formData.taxaContrato) ?? undefined,
      tipoSolo: formData.tipoSolo ?? undefined,
    });
  };

  const tipoAreaOptions = [
    { id: "Própria", nome: "Própria" },
    { id: "Arrendada", nome: "Arrendada" },
  ];

  const tipoProprietarioOptions = [
    { id: "Pessoa Fisica", nome: "Pessoa Fisica" },
    { id: "Pessoa Juridica", nome: "Pessoa Juridica" },
  ];

  const tipoPagamentoOptions = [
    { id: "Dinheiro", nome: "Dinheiro" },
    { id: "Produto", nome: "Produto" },
  ];

  const tipoArea = watch("tipoArea");
  const isArrendada = tipoArea === "Arrendada";

  const tipoPagamento = watch("tipoPagamento");
  const isProduto = tipoPagamento === "Produto";
  const isDinheiro = tipoPagamento === "Dinheiro";

  return (
    <div>
      <div className="relative">
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-400 hover:text-green-500"
        >
          {icon}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <form
            className="bg-gray-300 p-6 rounded shadow-lg w-full max-w-md flex flex-col gap-3 max-h-[90vh] overflow-y-auto scrollbar-hide"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <h2 className="text-xl font-bold mb-4">Atualizar Cliente</h2>
            <Input<UpdateFazendaSchema>
              label="Nome da fazenda"
              name="nome"
              register={register}
              errors={errors}
              placeholder="Digite o nome da fazenda"
            />

            <Select<UpdateFazendaSchema>
              label="UF"
              name="uf"
              register={register}
              errors={errors}
              options={estados.data || []}
            />

            <Select<UpdateFazendaSchema>
              label="Cidade"
              name="cidade"
              register={register}
              errors={errors}
              options={municipios.data || []}
            />

            <Input<UpdateFazendaSchema>
              label="Quantidade de hectares"
              name="quantHectares"
              type="number"
              register={register}
              errors={errors}
              placeholder="Digite a quantidade de hectares"
            />

            <Select<UpdateFazendaSchema>
              label="Tipo de área"
              name="tipoArea"
              register={register}
              errors={errors}
              options={tipoAreaOptions}
            />

            <Input<UpdateFazendaSchema>
              label="Número da matrícula"
              name="matricula"
              register={register}
              errors={errors}
              placeholder="Digite o número da matrícula"
            />

            <Input<UpdateFazendaSchema>
              label="Tipo de solo"
              name="tipoSolo"
              register={register}
              errors={errors}
              placeholder="Digite o tipo de solo"
            />

            <Input<UpdateFazendaSchema>
              label="IE"
              name="ie"
              register={register}
              errors={errors}
              placeholder="Inscrição Estadual (opcional)"
            />
            { isArrendada && (
              <>
                <Select<UpdateFazendaSchema>
                  label="Tipo de proprietário"
                  name="tipoProprietario"
                  register={register}
                  errors={errors}
                  options={tipoProprietarioOptions}
                />

                <Input<UpdateFazendaSchema>
                  label="Nome do proprietário"
                  name="nomeProprietario"
                  register={register}
                  errors={errors}
                  placeholder="Digite o nome do proprietário"
                />

                <Input<UpdateFazendaSchema>
                  label="CPF ou CNPJ"
                  name="cpfcnpj"
                  register={register}
                  errors={errors}
                  placeholder="Digite o CPF ou CNPJ"
                />

                <Input<UpdateFazendaSchema>
                  label="Vencimento do contrato"
                  type="date"
                  name="vencimentoContrato"
                  register={register}
                  errors={errors}
                  placeholder="Selecione a data de vencimento"
                />

                <Select<UpdateFazendaSchema>
                  label="Tipo de pagamento"
                  name="tipoPagamento"
                  register={register}
                  errors={errors}
                  options={tipoPagamentoOptions}
                />

                { isProduto && (
                  <Input<UpdateFazendaSchema>
                    label="Produto"
                    name="produto"
                    register={register}
                    errors={errors}
                    placeholder="Informe o produto"
                    />
                )}
                
                { isDinheiro && (
                  <Input<UpdateFazendaSchema>
                    label="Taxa do contrato"
                    name="taxaContrato"
                    type="number"
                    register={register}
                    errors={errors}
                    placeholder="Digite a taxa do contrato"
                    />
                )}
              </>
            )}
            
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
