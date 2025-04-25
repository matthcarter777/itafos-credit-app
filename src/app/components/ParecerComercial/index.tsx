import { ParecerComercial as ParecerComercialType } from "@/app/types/ParecerComercial"

type ParecerComercialProps = {
  data: ParecerComercialType[];
} 

export default function ParecerComercial({ data }: ParecerComercialProps) {
  // Helper function to format dates
  const formatarDataBR = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <>
      {data?.map((parecer, index) => (
        <div key={index} className='p-2 bg-white rounded-sm mb-4'>
          <div className='grid grid-cols-3 gap-4 mt-4'>
            <div>
              <p className='font-bold'>Conceito Comercial</p>
              <p className='text-gray-500 text-sm'>{parecer.conceitoComercial}</p>
            </div>
            <div>
              <p className='font-bold'>Atividade Principal</p>
              <p className='text-gray-500 text-sm'>{parecer.atividadePrincipal}</p>
            </div>
            <div>
              <p className='font-bold'>Exerce a Atividade Principal desde</p>
              <p className='text-gray-500 text-sm'>
                {parecer.dataAtividadePrincipal && formatarDataBR(parecer.dataAtividadePrincipal)}
              </p>
            </div>
            <div>
              <p className='font-bold'>Evolução da Atividade nos Últimos Três Anos</p>
              <p className='text-gray-500 text-sm'>{parecer.evoluAtivPrin}</p>
            </div>
            <div>
              <p className='font-bold'>Evolução da Atividade Principal</p>
              <p className='text-gray-500 text-sm'>{parecer.evoluAtivPrin}</p>
            </div>
          </div>
          <div>
            <p className='font-bold'>Observações da Equipe de Vendas</p>
            <p className='text-gray-500 text-sm'>{parecer.observacao}</p>
          </div>
        </div>
      ))}
    </>
  );
}