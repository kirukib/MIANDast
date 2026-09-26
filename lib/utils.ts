import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Round SVG coordinates so server and client render identical strings (no hydration drift). */
export function r2(n: number) {
  return Math.round(n * 100) / 100;
}
