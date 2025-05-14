"use client";

import { Proposta } from "@/app/types/Proposta";
import { formatarDataBR } from "@/app/utils/formateDate";
import { BookmarkPlus } from "lucide-react";
import React from "react";
import { useRouter } from 'next/navigation';
import DeletePropostaModal from "../DeletePropostaModal";

type ProposalTableProps = {
  data?: Proposta[];
};

const ProposalClienteTable: React.FC<ProposalTableProps> = ({ data }) => {
  const router = useRouter();


  const handleClick = (id: string) => {
    router.push(`propostas/${id}`);
  };

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
              <td className="px-6 py-4 text-sm text-gray-900">{proposal?.nome}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{formatarDataBR(proposal?.data)}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{formatarDataBR(proposal?.validade)}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{proposal?.status ? "Finalizada" : "Aberta"}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{proposal?.cliente?.nomeCliente}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{proposal?.rtv?.nome}</td>
              <td className="px-6 py-4 text-sm text-gray-900 space-x-2">
                <button
                  onClick={() => handleClick?.(proposal?.id)}
                  className="px-3 py-1 text-sm text-white bg-emerald-700 hover:bg-emerald-800 rounded"
                >
                  <BookmarkPlus size="15px" />
                </button>
                <DeletePropostaModal 
                  id={proposal?.id}
                  title="Tem certeza que deseja remover a proposta ?"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProposalClienteTable;
