'use client';

import CreateItemPropostaModal from '@/app/components/CreateItemPropostaModal';
import ProposalItensTable from '@/app/components/ProductsTable';
import { getShowProposta } from '@/app/services/hooks/getShowProposta';
import { Proposta } from '@/app/types/Proposta';
import { formatarDataBR } from '@/app/utils/formateDate';
import { useQuery } from '@tanstack/react-query';
import { MoveLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

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
    router.push(`/rtv/propostas`);
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

        <div className='mb-8'>
          <div className='flex flex-row justify-between mb-9'>
            <h1 className='font-bold text-2xl'>Itens da Proposta</h1>
            <CreateItemPropostaModal title="+ Item da Proposta"/>
          </div>
          <ProposalItensTable data={data?.itensProposta} />
        </div>
      </div>
    </>
  );
}
