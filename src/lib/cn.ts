import { clsx, type ClassValue } from "clsx";

/** Combine CSS classes, including optional and conditional values. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
