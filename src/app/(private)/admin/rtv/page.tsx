"use client";

import CreateRTVModal from "@/app/components/CreateRTVModal";
import RTVTable from "@/app/components/RTVTable";
import { getRTV } from "@/app/services/hooks/getRTV";
import { useQuery } from "@tanstack/react-query";
import { RTV } from '@/app/types/RTV';

export default function RTVComponent() {
  const { data, isLoading } = useQuery<RTV[]>({ queryKey: ['rtvs'], queryFn: getRTV });


  const handleEdit = (user: any) => {
    alert(`Editar usuário: ${user.nome}`);
  };

  const handleToggleAtivo = (user: any) => {
    alert(
      `${user.ativo ? "Desabilitando" : "Ativando"} usuário: ${user.nome}`
    );
  };

  return (
    <div className="p-10">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-xl">RTVS</h1>
        <CreateRTVModal title="+ Novo RTV"/>
      </div>
      <div className="p-6">
        <RTVTable data={data} onEdit={handleEdit} onDelete={handleToggleAtivo} />
      </div>
    </div>
  );
}
