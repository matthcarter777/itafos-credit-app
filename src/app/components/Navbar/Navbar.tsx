import { Archive, Home, Info, LockKeyhole, Mail, Users } from 'lucide-react';
import Link from 'next/link'; // Remova se não estiver usando Next.js

const Navbar = () => {
  return (
    <nav className="w-full h-full bg-gray-200 flex flex-col p-4">
      <div className="text-2xl font-bold text-gray-800 mb-8">
        <Link href="/">Administrador</Link>
      </div>

      <ul className="flex flex-col gap-4 text-gray-700 font-medium">
        <li>
          <Link href="/home" className="flex items-center gap-2 hover:text-green-600 transition">
            <Home size={20} /> Início
          </Link>
        </li>
        <li>
          <Link href="/usuarios" className="flex items-center gap-2 hover:text-green-600 transition">
            <Users size={20} /> Usuarios
          </Link>
        </li>
        <li>
          <Link href="/regras" className="flex items-center gap-2 hover:text-green-600 transition">
            <LockKeyhole size={20} /> Regras
          </Link>
        </li>
        <li>
          <Link href="/produtos" className="flex items-center gap-2 hover:text-green-600 transition">
            <Archive size={20} />  Produtos
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
