import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center gap-4 justify-center bg-stone-50">
      <Image 
        src="/images/logo-itafos.png" 
        alt="Logo" 
        width={150} 
        height={150} 
        className="transition-transform duration-500 transform scale-100 hover:scale-110"
      />
      <div className="w-80 h-80 flex flex-col justify-center bg-gray-300 p-8 gap-4 rounded-sm">
        <label className="font-bold text-black">E-mail</label>
        <input className="bg-stone-50 rounded-sm h-10" type="email" />
        <label className="font-bold text-black">Senha</label>
        <input className="bg-stone-50 rounded-sm h-10" type="password" />
        <button className="bg-emerald-900 text-stone-50 rounded-sm h-10 " type="button">Entrar</button>
      </div>
    </div>
  );
}

