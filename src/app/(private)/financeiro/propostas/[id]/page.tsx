'use client';

import ParecerComercial from '@/app/components/ParecerComercial';
import ProposalItensTable from '@/app/components/ItensPropostaTable';
import { getShowProposta } from '@/app/services/hooks/getShowProposta';
import { Proposta } from '@/app/types/Proposta';
import { formatarDataBR } from '@/app/utils/formateDate';
import { useQuery } from '@tanstack/react-query';
import { MoveLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Textbox from '@/app/components/Textbox';
import { cnpj, cpf } from '@/app/utils/cpf-cnpj-mask';
import EnderecoTable from '@/app/components/EnderecoTable';
import EmailsClienteTable from '@/app/components/EmailsClienteTable';
import ReferenciasTable from '@/app/components/ReferenciasTable';
import FazendasContainer from '@/app/components/FazendaContainer';

export default function PropostasPage() {
  const params = useParams();
  const router = useRouter();

  const id = typeof params.id === 'string' ? params.id : undefined;

  const { data, isLoading } = useQuery<Proposta>({
    queryKey: ['propostas', id],
    queryFn: async () => {
      if (!id) throw new Error('ID da proposta não definido');
      return await getShowProposta(id);
    },
    enabled: !!id, 
  });

  const handleClick = () => {
    router.push(`/financeiro/propostas`);
  };

  return (
    <>
      <div className="flex flex-row justify-between p-2">
        <button className='hover:text-gray-500' onClick={handleClick}>
          <MoveLeft />
        </button>
        <div>
          <p>Detalhes da proposta</p> 
          <p className="font-bold">#{data?.nome}</p>
        </div>
      </div>

      <div className='p-2'>
        <div className='mb-8'>
          <h1 className='font-bold text-2xl'>Dados do Cliente</h1>
          <div className='grid grid-cols-4 gap-4 mt-4'>
            <Textbox title='Nome' data={data?.cliente?.nomeCliente} />
            <Textbox title='Tipo de Cliente' data={data?.cliente?.tipoCliente} />
            <Textbox 
              title={data?.cliente?.tipoCliente == 'Pessoa Fisica' ? 'CPF' : 'CNPJ'} 
              data={data?.cliente?.cpfcnpj} 
              mask={data?.cliente?.tipoCliente == 'Pessoa Fisica' ? cpf : cnpj } 
            />
            <Textbox 
              isHidde={!!!data?.cliente?.dataConstituicao} 
              title='Data de Constituição' data={data?.cliente?.dataConstituicao} 
              mask={formatarDataBR}
            />
            <Textbox isHidde={!!!data?.cliente?.ie} title='Inscrição Estadual - IE' data={data?.cliente?.ie} />
            <Textbox isHidde={!!!data?.cliente?.regTrib} title='Regime de Tributação' data={data?.cliente?.regTrib} />
            <Textbox isHidde={!!!data?.cliente?.dataNascimento} title='Data de Nascimento' data={data?.cliente?.dataNascimento} />
            <Textbox isHidde={!!!data?.cliente?.estadoCivil} title='Estado Civil' data={data?.cliente?.estadoCivil} />
            <Textbox title='RTV' data={`${data?.rtv?.nome} - ${data?.rtv?.matricula}`} />
          </div>
        </div>
      </div>

      <div className='mb-8'>
        <div className='flex flex-row justify-between mb-9'>
          <h1 className='font-bold text-2xl'>Informações do Conjuge</h1>
        </div>
        <div className='grid grid-cols-4 gap-4 mt-4' >
          <Textbox title='Nome' data={data?.cliente?.conjuge?.nome} />
          <Textbox title='CPF' data={data?.cliente?.conjuge?.cpf} />
          <Textbox title='RG' data={data?.cliente?.conjuge?.rg} />
          <Textbox title='Orgão Expeditor' data={data?.cliente?.conjuge?.orgaoExpedidor} />
          <Textbox title='Data Nascimento' data={data?.cliente?.conjuge?.dataNascimento} mask={formatarDataBR} />
        </div>
      </div>

      <div className='mb-15'>
        <div className='flex flex-row justify-between mb-9'>
          <h1 className='font-bold text-2xl'>Informações de Localização</h1>
        </div>
        <EnderecoTable data={data?.cliente?.enderecos} queryId='propostas' isAction={false} />
      </div>

      <div className='mb-15'>
        <div className='flex flex-row justify-between mb-9'>
          <h1 className='font-bold text-2xl'>Emails</h1>
        </div>
        <EmailsClienteTable data={data?.cliente?.emails} isAction={false} />
      </div>

      <div className='mb-15'>
        <div className='flex flex-row justify-between mb-9'>
          <h1 className='font-bold text-2xl'>Referencias</h1>
        </div>
        <ReferenciasTable data={data?.cliente?.referencias} queryId='propostas' isAction={false} />
      </div>

      <div className='mb-15'>
        <div className='flex flex-row justify-between mb-9'>
          <h1 className='font-bold text-2xl'>Fazendas</h1>
        </div>
        <FazendasContainer data={data?.cliente?.fazendas} queryId='propostas' isAction={false} />
      </div>

      <div className='p-2'>
        <div className='mb-8'>
          <h1 className='font-bold text-2xl'>Dados da Proposta</h1>
          <div className='grid grid-cols-4 gap-4 mt-4'>
            <div>
              <p className='font-bold'>Nome Proposta</p>
              <p className='text-gray-500 text-sm'>{data?.nome}</p>
            </div>
            <div>
              <p className='font-bold'>Data Criação Proposta</p>
              <p className='text-gray-500 text-sm'>{data?.data && formatarDataBR(data.data)}</p>
            </div>
            <div>
              <p className='font-bold'>Validade Proposta</p>
              <p className='text-gray-500 text-sm'>{data?.validade && formatarDataBR(data.validade)}</p>
            </div>
            <div>
              <p className='font-bold'>Status Proposta</p>
              <p className='text-gray-500 text-sm'>{data?.status ? "Finalizada" : "Aberta"}</p>
            </div>
            <div>
              <p className='font-bold'>Nome Cliente</p>
              <p className='text-gray-500 text-sm'>{data?.cliente?.nomeCliente}</p>
            </div>
            <div>
              <p className='font-bold'>Nome RTV</p>
              <p className='text-gray-500 text-sm'>{data?.rtv?.nome}</p>
            </div>
          </div>
        </div>

        <div className='mb-15'>
          <div className='flex flex-row justify-between mb-9'>
            <h1 className='font-bold text-2xl'>Itens da Proposta</h1>
          </div>
          <ProposalItensTable data={data?.itensProposta} isAction={false} />
        </div>

        <div className='mb-8'>
          <div className='flex flex-row justify-between mb-9'>
            <h1 className='font-bold text-2xl'>Parecer Comercial</h1>
          </div>
          <ParecerComercial data={data?.cliente.parecerComercial || []} isAction={false} />
        </div>
      </div>
    </>
  );
}
