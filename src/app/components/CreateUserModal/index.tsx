'use client'

import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '../Input/Input';
import Select from '../Select/Select';
import { useEffect, useState } from 'react'
import { getRoles } from '@/app/services/hooks/getRegras';
import { getRTV } from '@/app/services/hooks/getRTV';
import { getClientes } from '@/app/services/hooks/getClientes';
import { api } from '@/app/services/apiClient';
import { Toast } from '../Toast/Toast';
import { useMutation } from '@tanstack/react-query';
import { createUser } from '@/app/services/create/CreateUser';
import { queryClient } from '@/app/services/queryClient';


type CreateUserModalProps = {
  title: string;
}

const createUserSchema = z.object({
  nome: z.string().nonempty('Nome não pode ser em branco.'),
  email: z.string().email("E-mail inválido"),
  senha: z.string().nonempty('Senha não pode ser em branco.'),
  rtvId: z.string(),
  regraId: z.string(),
  clienteId: z.string(),
});

type CreateUserSchema = z.infer<typeof createUserSchema>;
export default function CreateUserModal({ title }: CreateUserModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [rtvs, setRTVS] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    getData();
  }, [])

  async function getData() {
    const roles = await getRoles();
    const rtvs = await getRTV();
    const clientes = await getClientes();


    setRoles(roles as any);
    setRTVS(rtvs as any);
    setClientes(clientes as any);
  }

  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });


  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setShowToast(true);
      setIsOpen(false);
    },
    onError: (error) => {
      console.error('Erro ao criar usuario:', error);
    },
  });
  

  const handleFormSubmit = async (data: CreateUserSchema) => {
    setIsOpen(false); 

    await mutation.mutateAsync(data);
  };

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
            <h2 className="text-xl font-bold mb-4">Criar usuario</h2>
              <Input<CreateUserSchema>
                label="Nome"
                name="nome"
                register={register}
                errors={errors}
                placeholder="Digite seu nome"
              />
              <Input<CreateUserSchema>
                label="Email"
                name="email"
                register={register}
                errors={errors}
                placeholder="Digite seu email"
              />
              <Input<CreateUserSchema>
                label="Senha"
                name="senha"
                register={register}
                errors={errors}
                placeholder="Digite seu email"
              />
              <Select<CreateUserSchema>
                label="Regra"
                name="regraId"
                register={register}
                errors={errors}
                options={roles}
              />
              <Select<CreateUserSchema>
                label="Cliente"
                name="clienteId"
                register={register}
                errors={errors}
                options={clientes}
              />
              <Select<CreateUserSchema>
                label="RTV"
                name="rtvId"
                register={register}
                errors={errors}
                options={rtvs}
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
