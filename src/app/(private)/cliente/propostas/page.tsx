"use client";

import ProposalClienteTable from "@/app/components/ProposalClienteTable";
import { getProposta } from "@/app/services/hooks/getProposta";
import { getPropostasCliente } from "@/app/services/hooks/getPropostarCliente";
import { Proposta } from "@/app/types/Proposta";
import { useQuery } from "@tanstack/react-query";

export default function PropostasPage() {
  const { data, isLoading } = useQuery<Proposta[]>({ queryKey: ['propostas'], queryFn: getPropostasCliente });

  return (
    <div className="p-10">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-xl">Propostas</h1>
      </div>
      <div className="p-6">
        <ProposalClienteTable data={data || []} />
      </div>
    </div>
  );
}
