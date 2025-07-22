'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';

import { api } from '../services/apiClient';

type User = {
  id: string;
  nome: string;
  email: string;
  ativo: boolean;
  regraId: string;
  rtvId: string;
  clienteId: string;
  regra: {
    id: string;
    nome: string;
  };
};

type SignInCredentials = {
  email: string;
  senha: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<any>;
  signOut(): void;
  isAuthenticated: boolean;
  user: User | undefined;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token, 'nextauth.user': userCookie } = parseCookies();

    if (token && userCookie) {
      try {
        const parsedUser = JSON.parse(userCookie);
        setUser(parsedUser);
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
      } catch {
        signOut(); 
      }
    }
  }, []);

  function signOut() {
    destroyCookie(undefined, 'nextauth.token');
    destroyCookie(undefined, 'nextauth.user');
    setUser(undefined);
    router.push('/login');
  }

  async function signIn({ email, senha }: SignInCredentials): Promise<any> {
    try {
      const response = await api.post('login', { email, senha });

      console.log('response')

      const { token, user: userData } = response.data;

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setCookie(undefined, 'nextauth.user', JSON.stringify(userData), {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setUser(userData);

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      router.push('/home');

      return response;
    } catch (err) {
      return err;
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);