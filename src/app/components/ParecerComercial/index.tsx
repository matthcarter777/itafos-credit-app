import { deleteParecerComercial } from "@/app/services/delete/DeleteParecerComercialService";
import { queryClient } from "@/app/services/queryClient";
import { ParecerComercial as ParecerComercialType } from "@/app/types/ParecerComercial"
import { formatarAno } from "@/app/utils/formateAno";
import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import DeleteParecerComercialModal from "../DeleteParecerComercialModal";

type ParecerComercialProps = {
  data: ParecerComercialType[];
  isAction?: boolean;
} 

export default function ParecerComercial({ data, isAction = true }: ParecerComercialProps) {

  const formatarDataBR = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const mutation = useMutation({
    mutationFn: deleteParecerComercial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['propostas'] });
      toast.success('Parecer comercial excluido.');
    },
    onError: (error) => {
      toast.error('Erro remover parecer comercial');
    },
  });

  const removerParecer = async (id: string) => {
    await mutation.mutateAsync({ id });
  }


  return (
    <>
      {data?.map((parecer, index) => (
        <div key={index} className="p-2 bg-white rounded-sm mb-4 relative">
          { isAction && (
            <DeleteParecerComercialModal 
              id={parecer.id} 
              title="Tem certeza que deseja remover o parecer comercial ?"
            />
          )}
          
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
  )
}