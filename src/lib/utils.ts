import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractVariables(body: string) {
  return Array.from(new Set(Array.from(body.matchAll(/\{\{\s*([\w-]+)\s*\}\}/g)).map((match) => match[1])));
}

export function substituteVariables(body: string, values: Record<string, string>) {
  return body.replace(/\{\{\s*([\w-]+)\s*\}\}/g, (_, key: string) => values[key] || `{{${key}}}`);
}
