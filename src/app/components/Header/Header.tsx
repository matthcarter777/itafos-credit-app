'use client';

import Image from 'next/image';
import Link from 'next/link';
export default function Header() {
  return (
    <header className="w-full h-16 bg-gray-500 text-white flex items-center justify-between px-6 shadow-md">
      <div className="text-lg font-bold">
        <Image 
          src="/images/favicon.png" 
          alt="Logo" 
          width={50} 
          height={150} 
          className="transition-transform duration-500 transform scale-100 hover:scale-110"
        />
      </div>
      <nav className="space-x-4 hidden md:flex">
        <Link href="/" className="hover:underline">Início</Link>
        <Link href="/sobre" className="hover:underline">Sobre</Link>
        <Link href="/contato" className="hover:underline">Contato</Link>
      </nav>
    </header>
  );
}
