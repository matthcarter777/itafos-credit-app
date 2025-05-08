"use client";

import { ItemProposta } from "@/app/types/ItemProposta";
import { Produto } from "@/app/types/Produto";
import { formatarDataBR } from "@/app/utils/formateDate";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";
import DeleteItemPropostaModal from "../DeleteItemPropostaModal";

type ProposalItensTableProps = {
  data?: ItemProposta[];
  onEdit?: (user: ItemProposta) => void;
  onDelete?: (user: ItemProposta) => void;
};

const ProposalItensTable: React.FC<ProposalItensTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Produto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Quantidade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Valor TON</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Tipo Frete</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Valor Frete(TON)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Valor Credito</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Tipo Operação</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Vencimento</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data?.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{item.produto.nome}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{item.quantidade}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{item.valorTon}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{item.tipoFrete}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{item.freteTon}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{item.valorCredito}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{item.tipoOperacao}</td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {item?.vencimento && formatarDataBR(item.vencimento)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 space-x-2">
                <button
                  onClick={() => onEdit?.(item)}
                  className="px-3 py-1 text-sm text-white bg-emerald-700 hover:bg-emerald-800 rounded"
                >
                  <Pencil size="20px" />
                </button>
                <DeleteItemPropostaModal
                  id={item.id}
                  title="Tem certeza que deseja remover o Item"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProposalItensTable;
