'use client';

import CreateItemPropostaModal from '@/app/components/CreateItemPropostaModal';
import { useQuery } from '@tanstack/react-query';
import { MoveLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Textbox from '@/app/components/Textbox';
import { cpf , cnpj} from "@/app/utils/cpf-cnpj-mask";
import { Cliente } from '@/app/types/Cliente';
import { getShowCliente } from '@/app/services/hooks/getShowCliente';
import { formatarDataBR } from '@/app/utils/formateDate';
import EnderecoTable from '@/app/components/EnderecoTable';
import EmailsClienteTable from '@/app/components/EmailsClienteTable';
import ReferenciasTable from '@/app/components/ReferenciasTable';
import FazendasContainer from '@/app/components/FazendaContainer';
import CreateEmailClienteModal from '@/app/components/CreateEmailClienteModal';
import CreateConjugeModal from '@/app/components/CreateConjugeModal';

export default function ClientePage() {
  const params = useParams();
  const router = useRouter();

  const id = typeof params.id === 'string' ? params.id : undefined;

  const { data, isLoading } = useQuery<Cliente>({
    queryKey: ['clientes', id],
    queryFn: async () => {
      if (!id) throw new Error('ID da proposta não definido');
      return await getShowCliente(id);
    },
    enabled: !!id, 
  });

  const handleClick = () => {
    router.push(`/rtv/clientes`);
  };

  return (
    <>
      <div className="flex flex-row justify-between p-2">
        <button className='hover:text-gray-500' onClick={handleClick}>
          <MoveLeft />
        </button>

        <div>
          <p>Detalhes do cliente</p> 
          <p className="font-bold">#{data?.nomeCliente}</p>
        </div>
      </div>

      <div className='p-2'>
        <div className='mb-8'>
          <h1 className='font-bold text-2xl'>Dados do Cliente</h1>
          <div className='grid grid-cols-4 gap-4 mt-4'>
            <Textbox title='Nome' data={data?.nomeCliente} />
            <Textbox title='Tipo de Cliente' data={data?.tipoCliente} />
            <Textbox 
              title={data?.tipoCliente == 'Pessoa Fisica' ? 'CPF' : 'CNPJ'} 
              data={data?.cpfcnpj} 
              mask={data?.tipoCliente == 'Pessoa Fisica' ? cpf : cnpj } 
            />
            <Textbox 
              isHidde={!!!data?.dataConstituicao} 
              title='Data de Constituição' data={data?.dataConstituicao} 
              mask={formatarDataBR}
            />
            <Textbox isHidde={!!!data?.ie} title='Inscrição Estadual - IE' data={data?.ie} />
            <Textbox isHidde={!!!data?.regTrib} title='Regime de Tributação' data={data?.regTrib} />
            <Textbox isHidde={!!!data?.dataNascimento} title='Data de Nascimento' data={data?.regTrib} />
            <Textbox isHidde={!!!data?.estadoCivil} title='Estado Civil' data={data?.estadoCivil} />
            <Textbox title='RTV' data={`${data?.rtv?.nome} - ${data?.rtv?.matricula}`} />
          </div>
        </div>

        <div className='mb-8'>
          <div className='flex flex-row justify-between mb-9'>
            <h1 className='font-bold text-2xl'>Informações do Conjuge</h1>
            <CreateConjugeModal clienteId={data?.id || ''} title="+ Conjuge" isMarried={data?.conjuge ? true : false} />
          </div>
          <div className='grid grid-cols-4 gap-4 mt-4' >
            <Textbox title='Nome' data={data?.conjuge?.nome} />
            <Textbox title='CPF' data={data?.conjuge?.cpf} />
            <Textbox title='RG' data={data?.conjuge?.rg} />
            <Textbox title='Orgão Expeditor' data={data?.conjuge?.orgaoExpedidor} />
            <Textbox title='Data Nascimento' data={data?.conjuge?.dataNascimento} mask={formatarDataBR} />
          </div>
        </div>

        <div className='mb-15'>
          <div className='flex flex-row justify-between mb-9'>
            <h1 className='font-bold text-2xl'>Informações de Localização</h1>
            <CreateItemPropostaModal propostaId={id || ''} title="+ Endereço"/>
          </div>
          <EnderecoTable data={data?.enderecos} />
        </div>

        <div className='mb-15'>
          <div className='flex flex-row justify-between mb-9'>
            <h1 className='font-bold text-2xl'>Emails</h1>
            <CreateEmailClienteModal clienteId={data?.id || ''} title="+ Email"/>
          </div>
          <EmailsClienteTable data={data?.emails} />
        </div>
        <div className='mb-15'>
          <div className='flex flex-row justify-between mb-9'>
            <h1 className='font-bold text-2xl'>Referencias</h1>
            <CreateItemPropostaModal propostaId={id || ''} title="+ Referencia"/>
          </div>
          <ReferenciasTable data={data?.referencias} />
        </div>

        <div className='mb-15'>
          <div className='flex flex-row justify-between mb-9'>
            <h1 className='font-bold text-2xl'>Fazendas</h1>
            <CreateItemPropostaModal propostaId={id || ''} title="+ Fazenda
            "/>
          </div>
          <FazendasContainer data={data?.fazendas} />
        </div>

      </div>
    </>
  );

}
