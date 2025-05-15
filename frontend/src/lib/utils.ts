import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const removeCurrency = (value: string) => {
  return value?.replace(/[^\d]/g, '');
};
export const formatCurrency = (value: string | number) => {
  const cleaned = value.toString().replace(/\D/g, '')
  const numericValue = Number(cleaned)

  if (!numericValue) return 'R$ 0,00';

  const formatted = (numericValue / 100).toFixed(2);

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(formatted));
};

export function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}
