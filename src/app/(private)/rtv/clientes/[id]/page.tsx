'use client';

import CreateItemPropostaModal from '@/app/components/CreateItemPropostaModal';
import CreateParecerComercialModal from '@/app/components/CreateParecerComercialModal';
import ParecerComercial from '@/app/components/ParecerComercial';
import ProposalItensTable from '@/app/components/ItensPropostaTable';
import { getShowProposta } from '@/app/services/hooks/getShowProposta';
import { Proposta } from '@/app/types/Proposta';
import { formatarDataBR } from '@/app/utils/formateDate';
import { useQuery } from '@tanstack/react-query';
import { MoveLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Textbox from '@/app/components/Textbox';
import { cpf } from "@/app/utils/cpf-cnpj-mask";

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
          <p className="font-bold">#{data?.nome}</p>
        </div>
      </div>

      <div className='p-2'>
        <div className='mb-8'>
          <h1 className='font-bold text-2xl'>Dados do Cliente</h1>
          <div className='grid grid-cols-4 gap-4 mt-4'>
            <Textbox title='CPF' data='06449252138' mask={cpf} />
          </div>
        </div>

        <div className='mb-15'>
          <div className='flex flex-row justify-between mb-9'>
            <h1 className='font-bold text-2xl'>Itens da Proposta</h1>
            <CreateItemPropostaModal propostaId={id || ''} title="+ Item da Proposta"/>
          </div>
          <ProposalItensTable data={data?.itensProposta} />
        </div>

        <div className='mb-8'>
          <div className='flex flex-row justify-between mb-9'>
            <h1 className='font-bold text-2xl'>Parecer Comercial</h1>
            <CreateParecerComercialModal clientId={data?.cliente.id || ''} title="+ Parecer Comercial"/>
          </div>
          <ParecerComercial data={data?.cliente.parecerComercial || []} />
        </div>
      </div>
    </>
  );
}
