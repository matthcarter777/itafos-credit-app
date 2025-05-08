'use client';

import { createContext, ReactNode, useContext, useState } from "react";
import { setCookie, destroyCookie } from 'nookies';
import { useRouter } from "next/navigation";

import { api } from "../services/apiClient";

type User = {
  id: string;
  name: string;
  email: string;
}

type SignInCredentials = {
  email: string;
  senha: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<boolean>;
  signOut(): void;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter(); 
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  function signOut() {
    destroyCookie(undefined, 'nextauth.token');
    router.push('/login');
  }
  

  async function signIn({ email, senha }: SignInCredentials): Promise<boolean> {
    try {
      const response = await api.post('login', { email, senha });

      const { token } = response.data;

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setUser(response.data.user);

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      router.push('/home');

      return true;
    } catch (err) {
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}