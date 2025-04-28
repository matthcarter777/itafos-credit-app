'use client';

import Input from "@/app/components/Input/Input";
import { useAuth } from "@/app/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().nonempty('Senha não pode ser em branco.'),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { signIn } = useAuth();

  function handleFormSubmit(data: LoginSchema) {
    signIn(data)
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center gap-4 justify-center bg-stone-50">
      <Image 
        src="/images/logo-itafos.png" 
        alt="Logo" 
        width={150} 
        height={150} 
        className="transition-transform duration-500 transform scale-100 hover:scale-110"
      />
      <form 
        onSubmit={handleSubmit(handleFormSubmit)} 
        className="w-80 flex flex-col justify-center bg-gray-300 p-8 gap-4 rounded-sm" 
      >
        <Input<LoginSchema>
          label="Email"
          name="email"
          register={register}
          errors={errors}
          placeholder="Digite seu email"
        />

        <Input<LoginSchema>
          label="Senha"
          name="senha"
          register={register}
          errors={errors}
          placeholder="Digite sua senha"
        />

        <button 
          className="bg-emerald-900 text-stone-50 rounded-sm h-10 font-bold hover:bg-emerald-800 transition-colors" 
          type="submit"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
