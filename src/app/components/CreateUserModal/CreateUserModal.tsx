'use client'

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '../Input/Input';
import Select from '../Select/Select';



type CreateUserModalProps = {
  title: string;
}

const createUserSchema = z.object({
  nome: z.string().nonempty('Senha não pode ser em branco.'),
  email: z.string().email("E-mail inválido"),
  senha: z.string().nonempty('Senha não pode ser em branco.'),
  rtvId: z.string(),
  regraId: z.string(),
  clienteId: z.string(),
});

type CreateUserSchema = z.infer<typeof createUserSchema>;
export default function CreateUserModal({ title }: CreateUserModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  function handleFormSubmit(data: CreateUserSchema) {
    console.log(data)
    setIsOpen(false)
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
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
          <form className="bg-gray-300 p-6 rounded shadow-lg w-full max-w-md" onSubmit={handleSubmit(handleFormSubmit)} >
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
                options={[
                  { label: 'Adminstrador', value: 'asdasd' },
                  { label: 'Financeiro', value: 'b' },
                  { label: 'RTV', value: 'b' },
                ]}
              />
              <Select<CreateUserSchema>
                label="Cliente"
                name="clienteId"
                register={register}
                errors={errors}
                options={[
                  { label: 'Cliente A', value: 'a' },
                  { label: 'Cliente B', value: 'b' },
                ]}
              />
              <Select<CreateUserSchema>
                label="RTV"
                name="rtvId"
                register={register}
                errors={errors}
                options={[
                  { label: 'Cliente A', value: 'a' },
                  { label: 'Cliente B', value: 'b' },
                ]}
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
        </div>
      )}
    </div>
  )
}
