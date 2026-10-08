export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/u)
    .map((part) => Array.from(part)[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");
}
