"use client";

import { Email } from "@/app/types/Email";
import React from "react";
import DeleteEmailClienteModal from "../DeleteEmailClienteModal";

type EmailTableProps = {
  data?: Email[];
  isAction?: boolean;
};

const EmailsClienteTable: React.FC<EmailTableProps> = ({ data, isAction = true }) => {

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Descrição</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
            { isAction && <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ações</th> }
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data?.map((email, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{email.descricao}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{email.email}</td>
                {isAction && (
                  <td className="px-6 py-4 text-sm text-gray-900 space-x-2">
                    <DeleteEmailClienteModal
                      id={email.id}
                      title={`Tem certeza que deseja remover o email: ${email.email}`} 
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

export default EmailsClienteTable;
