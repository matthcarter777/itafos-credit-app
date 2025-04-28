"use client";

export function formatarAno(dataISO: string): string {
  if (!dataISO) return '';
  const [ano] = dataISO.split('-');
  return ano;
}
