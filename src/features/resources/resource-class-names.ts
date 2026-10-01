import styles from "./resources.module.css";

/** Maps the approved prototype's class tokens to locally scoped CSS Modules. */
export function resourceClassNames(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => styles[token] ?? token)
    .join(" ");
}
