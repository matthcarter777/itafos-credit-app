// utils/encrypt.ts
import { SignJWT } from 'jose';
import { UserJwt } from '../types/UserJwt';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'minha-chave-secreta');

export async function gerarToken(user: UserJwt): Promise<string> {
  const token = await new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(secret);

  return token;
}

