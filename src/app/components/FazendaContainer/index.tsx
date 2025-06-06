"use client";

import React from "react";
import { Fazenda } from "@/app/types/Fazenda";
import Textbox from "../Textbox";
import { formatarDataBR } from "@/app/utils/formateDate";
import { cnpj, cpf } from "@/app/utils/cpf-cnpj-mask";
import CreateAtividadeClienteModal from "../CreateAtividadeClienteModal";
import DeleteAtividadeClienteModal from "../DeleteAtividadeClienteModal";
import DeleteFazendaModal from "../DeleteFazendaModal";
import UpdateFazendaModal from "../UpdateFazendaModal";
import { Pencil } from "lucide-react";
import UpdateAtividadeModal from "../UpdateAtividadeModal";

type AtividadeTableProps = {
  data?: Fazenda[];
  queryId: string;
  isAction?: boolean;
};

const FazendasContainer: React.FC<AtividadeTableProps> = ({data, queryId, isAction = true}) => {

  return (
    <>
      {data?.map((fazenda, index) => {
        return (
          <div key={fazenda.id} className='p-2 bg-white rounded-sm mb-4 relative'>
            { isAction && (
              <div className="flex gap-2 mb-2 relative p-1">
                <UpdateFazendaModal 
                  queryId={queryId}
                  data={fazenda}
                  icon={<Pencil size="18px"/>}
                />
                <DeleteFazendaModal
                  id={fazenda.id}
                  title="Tem certeza que deseja remover a fazenda ?"
                  queryId={queryId}
                />
              </div>
            )}
            <div className='grid grid-cols-4 gap-4 mt-4 mb-6'>
              <Textbox title='Nome' data={fazenda.nome} isHidde={!!!fazenda.nome}/>
              <Textbox title='Cidade' data={fazenda.cidade} isHidde={!!!fazenda.cidade}/>
              <Textbox title='UF' data={fazenda.uf} isHidde={!!!fazenda.uf}/>
              <Textbox title='Inscrição Estadual - IE' data={fazenda.ie} isHidde={!!!fazenda.ie}/>
              <Textbox title='Qtde de ha' data={fazenda.quantHectares} isHidde={!!!fazenda.quantHectares}/>
              <Textbox title='Tipo de Area' data={fazenda.tipoArea} isHidde={!!!fazenda.tipoArea}/>
              <Textbox title='Tipo de Solo' data={fazenda.tipoSolo} isHidde={!!!fazenda.tipoSolo}/>
              <Textbox title='Nº da Matrícula' data={fazenda.matricula} isHidde={!!!fazenda.matricula}/>
              <Textbox title='Nome do proprietário (Arrendador)' data={fazenda.nomeProprietario} isHidde={!!!fazenda.nomeProprietario}/>
              <Textbox 
                title='Tipo proprietário (Arrendador)' 
                data={fazenda.tipoProprietario} 
                isHidde={!!!fazenda.tipoProprietario}
              />
              <Textbox 
                title={fazenda.tipoProprietario == 'Pessoa Fisica' ? 'CPF' : 'CNPJ'}  
                data={fazenda.cpfcnpj} 
                isHidde={!!!fazenda.cpfcnpj}
                mask={fazenda.tipoProprietario == 'Pessoa Fisica' ? cpf : cnpj } 
              />
              <Textbox title='Vencimento do Contrato' data={fazenda.vencimentoContrato} mask={formatarDataBR} isHidde={!!!fazenda.vencimentoContrato}/>
              <Textbox title='Tipo de Pagamento' data={fazenda.tipoPagamento} isHidde={!!!fazenda.tipoPagamento}/>
              <Textbox title='Produto' data={fazenda.produto} isHidde={!!!fazenda.produto}/>
              <Textbox title='Taxa do Contrato' data={`${fazenda.taxaContrato} | Sc. 60 kg`} isHidde={!!!fazenda.taxaContrato}/>
            </div>

            
            <div className='flex flex-row justify-between mb-9'>
              <h1 className='font-bold text-xl mb-3'>Atividades</h1>
              { isAction && <CreateAtividadeClienteModal fazendaId={ fazenda.id || ''} title="+ Atividade" queryId={queryId}/> }
            </div>

            { fazenda.atividades.map((atividade, index) => {
               return (
                <div  key={atividade.id}>
                  <div className="p-2 bg-gray-100 rounded-sm mb-4 relative">
                    { isAction && (
                      <div className="flex gap-2 mb-2 relative p-1">
                        <UpdateAtividadeModal 
                          queryId={queryId}
                          icon={<Pencil size="18px"/>}
                          data={atividade}
                        />
                        <DeleteAtividadeClienteModal 
                          id={atividade.id} 
                          title="Tem certeza que deseja remover a atividade ?"
                          queryId={queryId}
                        />
                      </div>
                    )}
                    <div className='grid grid-cols-3 gap-4 mt-4'>
                      <Textbox title='Atividade' data={atividade.nome} isHidde={!!!atividade.nome}/>
                      <Textbox 
                        title={atividade.nome == 'Pecuária' ? 'Tipo de Pecuária' : 'Tipo de Cultivo'}  
                        data={atividade.tipoCultivo} 
                        isHidde={!!!atividade.tipoCultivo}
                      />
                      <Textbox title='Qtde Animais' data={atividade.quantAnimais} isHidde={!!!atividade.quantAnimais}/>
                      <Textbox title='Confinamento' data={atividade.confinamento} isHidde={!!!atividade.confinamento}/>
                      <Textbox title='Leite' data={atividade.leite} isHidde={!!!atividade.leite}/>
                      <Textbox title='Corte' data={atividade.corte} isHidde={!!!atividade.corte}/>
                      <Textbox title='Área Plantada (ha)' data={atividade.areaPlantada} isHidde={!!!atividade.areaPlantada}/>
                      <Textbox title='Área Plantada (ha)' data={atividade.areaPlantada} isHidde={!!!atividade.areaPlantada}/>
                      <Textbox 
                        title='A Plantação e irrigada' 
                        data={atividade.irrigada ? 'Sim' : 'Não'} 
                        isHidde={!!!atividade.irrigada}
                      />
                      <Textbox 
                        title='Usa algum tipo de suplemento?' 
                        data={atividade.suplemento ? 'Sim' : 'Não'} 
                      />
                      <Textbox title='Nível de Tecnologia' data={atividade.nivelTecnologico}/>
                    </div>
                  </div>
                </div>
              )
            }) }
          </div>
        );
      })}
    </>
  );
};

export default FazendasContainer;
