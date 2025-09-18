import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function hasMinimumLength(password: string, length: number): boolean {
  return password.length >= length;
}
function hasUpperCaseLetter(password: string): boolean {
  return /[A-Z]/.test(password);
}
function hasLowerCaseLetter(password: string): boolean {
  return /[a-z]/.test(password);
}
function hasDigit(password: string): boolean {
  return /[0-9]/.test(password);
}
function hasSpecialCharacter(password: string): boolean {
  return /[@#$%&*]/.test(password);
}

export const passwordChecks = [
  {
    check: (pw: string) => hasMinimumLength(pw, 6),
    label: "Mínimo de 6 caracteres",
  },
  { check: hasUpperCaseLetter, label: "Contém letra maiúscula" },
  { check: hasLowerCaseLetter, label: "Contém letra minúscula" },
  { check: hasDigit, label: "Contém número" },
  { check: hasSpecialCharacter, label: "Contém caractere especial (@#$%&*)" },
];
