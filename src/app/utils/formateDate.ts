"use client";

export function formatarDataBR(dataISO: string): string {
  if (!dataISO || typeof dataISO !== "string") return "";

  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}
