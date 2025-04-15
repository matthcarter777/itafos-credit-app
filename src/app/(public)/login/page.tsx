'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().nonempty('Senha não pode ser em branco.'),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  function handleFormSubmit(data: LoginSchema) {
    console.log(data);
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
        <div className="flex flex-col">
          <label className="font-bold text-black">E-mail</label>
          <input 
            className={`bg-stone-50 rounded-sm h-10 px-2 border ${
              errors.email ? 'border-red-500' : 'border-transparent'
            }`} 
            type="email" 
            {...register('email')} 
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-bold text-black">Senha</label>
          <input 
            className={`bg-stone-50 rounded-sm h-10 px-2 border ${
              errors.password ? 'border-red-500' : 'border-transparent'
            }`} 
            type="password" 
            {...register('password')} 
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
          )}
        </div>

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
