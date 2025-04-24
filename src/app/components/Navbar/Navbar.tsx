import { Archive, CircleDollarSign, Contact, Home, Info, LockKeyhole, Mail, Users, Wallet } from 'lucide-react';
import Link from 'next/link'; // Remova se não estiver usando Next.js

const Navbar = () => {
  return (
    <nav className="w-full h-full bg-gray-200 flex flex-col p-4">
      <div className="text-2xl font-bold text-gray-800 mb-8">
        <Link href="/home">Administrador</Link>
      </div>

      <ul className="flex flex-col gap-4 text-gray-700 font-medium">
        <li>
          <Link href="/admin/home" className="flex items-center gap-2 hover:text-green-600 transition">
            <Home size={20} /> Início
          </Link>
        </li>
        <li>
          <Link href="/admin/usuarios" className="flex items-center gap-2 hover:text-green-600 transition">
            <Users size={20} /> Usuarios
          </Link>
        </li>
        <li>
          <Link href="/admin/regras" className="flex items-center gap-2 hover:text-green-600 transition">
            <LockKeyhole size={20} /> Regras
          </Link>
        </li>
        <li>
          <Link href="/admin/produtos" className="flex items-center gap-2 hover:text-green-600 transition">
            <Archive size={20} />  Produtos
          </Link>
        </li>
        <li>
          <Link href="/admin/rtv" className="flex items-center gap-2 hover:text-green-600 transition">
            <Contact size={20} />  RTV
          </Link>
        </li>
      </ul>

      <div className="text-2xl font-bold text-gray-800 mb-8 mt-4">
        <Link href="/home">RTV</Link>
      </div>

      <ul className="flex flex-col gap-4 text-gray-700 font-medium">
        <li>
          <Link href="/rtv/clientes" className="flex items-center gap-2 hover:text-green-600 transition">
            <Wallet size={20} /> Clientes
          </Link>
        </li>
        <li>
          <Link href="/rtv/propostas" className="flex items-center gap-2 hover:text-green-600 transition">
            <CircleDollarSign size={20} /> Propostas
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
