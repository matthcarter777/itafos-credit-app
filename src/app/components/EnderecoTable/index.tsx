"use client";

import { Endereco } from "@/app/types/Endereco";
import React, { ReactNode } from "react";
import DeleteEnderecoClienteModal from "../DeleteEnderecoClienteModal";

type EnderecoTableProps = {
  data?: Endereco[];
  onEdit?: (user: Endereco) => void;
  queryId: string;
  isAction?: boolean;
  icon?: ReactNode;
};

const EnderecoTable: React.FC<EnderecoTableProps> = ({ data, onEdit, queryId, isAction = true }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Endereco</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Cidade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">UF</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Bairro</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Numero</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">CEP</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Complemento</th>
            { isAction && <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ações</th> }
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data?.map((endereco, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{endereco.logradouro}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{endereco.cidade}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{endereco.uf}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{endereco.bairro}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{endereco.numero}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{endereco.cep}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{endereco.complemento}</td>
              { isAction && (
                <td className="px-6 py-4 text-sm text-gray-900 space-x-2">
                  <DeleteEnderecoClienteModal 
                    id={endereco.id}
                    title="Tem certeza que deseja remover o endereço ?"
                    queryId={queryId}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnderecoTable;
