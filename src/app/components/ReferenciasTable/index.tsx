"use client";

import { Referencia } from "@/app/types/Referencia";
import React from "react";
import DeleteReferenciaModal from "../DeleteReferenciaModal";

type ReferenciaTableProps = {
  data?: Referencia[];
};

const ReferenciasTable: React.FC<ReferenciaTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">CPF | CNPJ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Cidade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">UF</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Telefone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data?.map((referencia, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{referencia.nome}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{referencia.cpfcnpj}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{referencia.cidade}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{referencia.uf}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{referencia.telefone}</td>
              <td className="px-6 py-4 text-sm text-gray-900 space-x-2">
                <DeleteReferenciaModal 
                  id={referencia.id}
                  title={`Tem certeza que deseja remover a referencia: ${referencia.nome} - ${referencia.cpfcnpj}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReferenciasTable;
