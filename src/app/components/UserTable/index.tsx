"use client";

import { User } from "@/app/types/User";
import { Lock, LockOpen, Pencil } from "lucide-react";
import React from "react";
import DisableUserModal from "../DisableUserModal";

type UserTableProps = {
  data?: User[];
  onEdit?: (user: User) => void;
  onToggleAtivo?: (user: User) => void;
};

const UserTable: React.FC<UserTableProps> = ({ data, onEdit, onToggleAtivo }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ativo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Regra</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">RTV</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Cliente</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data?.map((user, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{user.nome}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{user.ativo ? "Sim" : "Não"}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{user.regra}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{user.rtv}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{user.cliente}</td>
              <td className="px-6 py-4 text-sm text-gray-900 space-x-2">
                <button
                  onClick={() => onEdit?.(user)}
                  className="px-3 py-1 text-sm text-white bg-emerald-700 hover:bg-emerald-800 rounded"
                >
                  <Pencil size="20px" />
                </button>
                <DisableUserModal 
                  id={user.id}
                  ativo={user.ativo}
                  queryId="users"
                  isDisabled={false}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
