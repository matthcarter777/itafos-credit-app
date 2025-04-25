'use client';

import { useState } from 'react';
import {
  Archive,
  CircleDollarSign,
  Contact,
  Home,
  LockKeyhole,
  Mail,
  Users,
  Wallet,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="lg:w-64 w-full lg:relative fixed lg:fixed top-[64px] lg:top-[64px] left-0 z-50 lg:h-[calc(100vh-64px)]">
      <div className="lg:hidden p-4 bg-gray-200 flex justify-between items-center">
        <span className="font-bold text-gray-800 text-xl">Menu</span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav
        className={clsx(
          "bg-gray-200 flex flex-col p-4 h-full lg:translate-x-0 transition-transform duration-300 ease-in-out",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen && typeof window !== 'undefined' && window.innerWidth < 1024,
            "absolute w-64": typeof window !== 'undefined' && window.innerWidth < 1024
          }
        )}
      >
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
              <Users size={20} /> Usuários
            </Link>
          </li>
          <li>
            <Link href="/admin/regras" className="flex items-center gap-2 hover:text-green-600 transition">
              <LockKeyhole size={20} /> Regras
            </Link>
          </li>
          <li>
            <Link href="/admin/produtos" className="flex items-center gap-2 hover:text-green-600 transition">
              <Archive size={20} /> Produtos
            </Link>
          </li>
          <li>
            <Link href="/admin/rtv" className="flex items-center gap-2 hover:text-green-600 transition">
              <Contact size={20} /> RTV
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
    </aside>
  );
};

export default Navbar;
