'use client';

import { useAuth } from '@/app/hooks/useAuth';
import { LogOut } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const { signOut, user } = useAuth(); 
  
  const handleSignOut = () => {
    signOut()
  }

  return (
    <header className="w-full h-16 bg-gray-700 text-white flex items-center justify-between px-6 shadow-md">
      <div className="text-lg font-bold">
        <Image 
          src="/images/logo-itf.png" 
          alt="Logo" 
          width={120} 
          height={150} 
          className="transition-transform duration-500 transform scale-100 hover:scale-110"
        />
      </div>
      <div className="flex items-center justify-between gap-2.5">
        <button
          className='hover:text-red-500'
          onClick={handleSignOut}
        >
          <LogOut />
        </button>
        <h1>|</h1>
        <div>
          <h3 className='font-bold'>{ user?.name }</h3>
          <p className='font-thin text-xs text-gray-200'>{ user?.email }</p>
        </div>
      </div>
    </header>
  );
}
