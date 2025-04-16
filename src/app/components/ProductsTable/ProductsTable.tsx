"use client";

import { Pencil, Trash2 } from "lucide-react";
import React from "react";

type Produto = {
  id: string;
  nome: string;
};

type ProdutoTableProps = {
  data: Produto[];
  onEdit?: (user: Produto) => void;
  onDelete?: (user: Produto) => void;
};

const ProductsTable: React.FC<ProdutoTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((product, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{product.id}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{product.nome}</td>
              <td className="px-6 py-4 text-sm text-gray-900 space-x-2">
                <button
                  onClick={() => onEdit?.(product)}
                  className="px-3 py-1 text-sm text-white bg-emerald-700 hover:bg-emerald-800 rounded"
                >
                  <Pencil size="20px" />
                </button>
                <button
                  onClick={() => onDelete?.(product)}
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

export default ProductsTable;
