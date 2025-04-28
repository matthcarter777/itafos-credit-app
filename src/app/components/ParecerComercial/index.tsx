import { ParecerComercial as ParecerComercialType } from "@/app/types/ParecerComercial"
import { formatarAno } from "@/app/utils/formateAno";
import { X } from "lucide-react";

type ParecerComercialProps = {
  data: ParecerComercialType[];
} 

export default function ParecerComercial({ data }: ParecerComercialProps) {

  const formatarDataBR = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const removerParecer = (id: string) => {
    alert('Remover')
  }

  return (
    <>
      {data?.map((parecer, index) => (
        <div key={index} className="p-2 bg-white rounded-sm mb-4 relative">
          <button
            onClick={() => removerParecer(parecer.id)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            aria-label="Remover parecer"
          >
            <X size={18} />
          </button>
          
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
                {parecer.dataAtividadePrincipal && formatarAno(parecer.dataAtividadePrincipal)}
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
          <div className="mt-4">
            <p className='font-bold'>Observações da Equipe de Vendas</p>
            <p className='text-gray-500 text-sm'>{parecer.observacao}</p>
          </div>
        </div>
      ))}
    </>
  )}