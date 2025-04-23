"use client";

import CreateProdutoModal from "@/app/components/CreateProdutoModal/CreateProdutoModal";
import ProductsTable from "@/app/components/ProductsTable/ProductsTable";
import { getProdutos } from "@/app/services/hooks/getProdutos";
import { Produto } from "@/app/types/Produto";
import { useQuery } from "@tanstack/react-query";

export default function Produtos() {
  const { data, isLoading } = useQuery<Produto[]>({ queryKey: ['produtos'], queryFn: getProdutos });

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
        <h1 className="font-bold text-xl">Produtos</h1>
        <CreateProdutoModal title="+ Novo Produto"/>
      </div>
      <div className="p-6">
        <ProductsTable data={data} onEdit={handleEdit} onDelete={handleToggleAtivo} />
      </div>
    </div>
  );
}
