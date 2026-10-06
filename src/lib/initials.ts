/** Up to two initials for an avatar, e.g. "Sarah M." → "SM". */
export function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part.match(/\p{L}/u)?.[0] ?? "")
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
