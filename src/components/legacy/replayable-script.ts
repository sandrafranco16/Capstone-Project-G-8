/**
 * The prototype scripts declare top-level `const`/`let` bindings. Classic
 * scripts share one global scope, so running them again after client-side
 * navigation back to the page throws "Identifier has already been declared"
 * and leaves the new page without its interactions. `var` may be redeclared,
 * so each visit re-runs cleanly against the freshly rendered markup.
 */
export function toReplayableScript(source: string): string {
  return source.replace(/^(?:const|let)(?=\s)/gm, "var");
}
