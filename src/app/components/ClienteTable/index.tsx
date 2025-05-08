"use client";

import { Cliente } from "@/app/types/Cliente";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import DeleteClienteModal from "../DeleteClienteModal";

type ProdutoTableProps = {
  data?: Cliente[];
  onEdit?: (user: Cliente) => void;
  onDelete?: (user: Cliente) => void;
};

const ClienteTable: React.FC<ProdutoTableProps> = ({ data, onEdit, onDelete }) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`clientes/${id}`);
  };


  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">CPF|CNPJ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data?.map((cliente, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{cliente.nomeCliente}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{cliente.cpfcnpj}</td>
              <td className="px-6 py-4 text-sm text-gray-900 space-x-2">
                <button
                  onClick={() => handleClick?.(cliente.id)}
                  className="px-3 py-1 text-sm text-white bg-emerald-700 hover:bg-emerald-800 rounded"
                >
                  <Eye size="20px" />
                </button>
                <DeleteClienteModal 
                  id={cliente.id}
                  title="Tem certeza que deseja excluir o cliente ?"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClienteTable;
