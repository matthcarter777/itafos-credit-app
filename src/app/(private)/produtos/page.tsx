"use client";

import CreateProdutoModal from "@/app/components/CreateProdutoModal/CreateProdutoModal";
import ProductsTable from "@/app/components/ProductsTable/ProductsTable";
import { getProdutos } from "@/app/services/hooks/getProdutos";
import { useEffect, useState } from "react";

export default function Produtos() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
      getData()
  }, [])

  async function getData() {
    const products = await getProdutos();

    setProducts(products as any)
  }

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
        <ProductsTable data={products} onEdit={handleEdit} onDelete={handleToggleAtivo} />
      </div>
    </div>
  );
}
