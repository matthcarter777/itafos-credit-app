"use client";

import { Produto } from "@/app/types/Produto";
import { Proposta } from "@/app/types/Proposta";
import { formatarDataBR } from "@/app/utils/formateDate";
import { BookmarkPlus, Pencil, Trash2 } from "lucide-react";
import React from "react";

type ProposalTableProps = {
  data?: Proposta[];
  onEdit?: (proposal: Proposta) => void;
  onDelete?: (proposal: Proposta) => void;
};

const ProposalTable: React.FC<ProposalTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Data</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Validade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Cliente</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">RTV</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data?.map((proposal, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{proposal.nome}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{formatarDataBR(proposal.data)}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{formatarDataBR(proposal.validade)}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{proposal.status ? "Finalizada" : "Ativa"}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{proposal.cliente.nomeCliente}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{proposal.rtv.nome}</td>
              <td className="px-6 py-4 text-sm text-gray-900 space-x-2">
                <button
                  onClick={() => onEdit?.(proposal)}
                  className="px-3 py-1 text-sm text-white bg-emerald-700 hover:bg-emerald-800 rounded"
                >
                  <Pencil size="20px" />
                </button>
                <button
                  onClick={() => onEdit?.(proposal)}
                  className="px-3 py-1 text-sm text-white bg-emerald-700 hover:bg-emerald-800 rounded"
                >
                  <BookmarkPlus size="20px" />
                </button>
                <button
                  onClick={() => onDelete?.(proposal)}
                  className="px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded"
                >
                  <Trash2 size="20px" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProposalTable;
