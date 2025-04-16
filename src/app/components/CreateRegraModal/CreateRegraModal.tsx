'use client'

import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '../Input/Input';
import { useEffect, useState } from 'react'
import { getRoles } from '@/app/services/hooks/getRegras';
import { api } from '@/app/services/apiClient';
import { Toast } from '../Toast/Toast';


type CreateUserModalProps = {
  title: string;
}

const createRegraSchema = z.object({
  nome: z.string().nonempty('Nome não pode ser em branco.')
});

type CreateRegraSchema = z.infer<typeof createRegraSchema>;
export default function CreateUserModal({ title }: CreateUserModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    getData();
  }, [])

  async function getData() {
    const roles = await getRoles();

    setRoles(roles as any);
  }

  const { register, handleSubmit, formState: { errors } } = useForm<CreateRegraSchema>({
    resolver: zodResolver(createRegraSchema),
  });

  async function handleFormSubmit(data: CreateRegraSchema) {
    setIsOpen(false);

    const response = await api.post('admin/regra', data);

    setShowToast(true)


    getData();

  }

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(true)}
        className="
        bg-emerald-700 
        text-stone-50 
        rounded-sm 
        h-10 
        font-bold 
        hover:bg-emerald-800 
        transition-colors
        p-3
        flex
        items-center
        justify-center
      " 
      >
        { title }
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <form 
            className="bg-gray-300 p-6 rounded shadow-lg w-full max-w-md flex flex-col gap-3" 
            onSubmit={handleSubmit(handleFormSubmit)} >
            <h2 className="text-xl font-bold mb-4">Criar Regra</h2>
              <Input<CreateRegraSchema>
                label="Nome"
                name="nome"
                register={register}
                errors={errors}
                placeholder="Digite seu nome"
              />
            <button
              className="px-4 py-2 bg-emerald-700  text-white rounded hover:bg-emerald-800 transition"
              type="submit"
            >
              Salvar
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Fechar
            </button>
          </form>

          {showToast && (
            <Toast
              message="Usuario salvos com sucesso!"
              onClose={() => setShowToast(false)}
            />
          )}
        </div>
      )}
    </div>
  )
}
