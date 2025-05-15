import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatCurrency(value: string) {

  const valueNumeric = value.replace(/\D/g, '');

  const float = parseFloat(valueNumeric) / 100;

  if (isNaN(float)) return '';

  return float.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}
