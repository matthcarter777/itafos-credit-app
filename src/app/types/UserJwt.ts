export type UserJwt = {
  id: string;
  ativo: boolean;
  regraId: string;
  regra: {
    id: string;
    nome: string;
  };
};