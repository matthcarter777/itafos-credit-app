"use client";

import { Pencil, Trash2 } from "lucide-react";
import React from "react";
import { RTV } from '../../types/RTV';

type RTVTableProps = {
  data?: RTV[];
  onEdit?: (user: RTV) => void;
  onDelete?: (user: RTV) => void;
};

const RTVTable: React.FC<RTVTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Matricula</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data?.map((rtv, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{rtv.id}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{rtv.matricula}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{rtv.nome}</td>
              <td className="px-6 py-4 text-sm text-gray-900 space-x-2">
                <button
                  onClick={() => onEdit?.(rtv)}
                  className="px-3 py-1 text-sm text-white bg-emerald-700 hover:bg-emerald-800 rounded"
                >
                  <Pencil size="20px" />
                </button>
                <button
                  onClick={() => onDelete?.(rtv)}
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

export default RTVTable;
