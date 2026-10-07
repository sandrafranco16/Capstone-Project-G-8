/**
 * Removes the prototype's own header, footer, skip link and progress bar so the
 * homepage uses the shared site shell from `app/layout.tsx`, like every other
 * page. demo/index.html stays intact; each step fails loudly if the prototype
 * no longer matches what this adapter expects.
 */

function removeOnce(source: string, pattern: RegExp | string, name: string) {
  const matches =
    typeof pattern === "string"
      ? source.split(pattern).length - 1
      : [...source.matchAll(pattern)].length;
  if (matches !== 1) {
    throw new Error(`Homepage shell migration expects one ${name}.`);
  }
  return source.replace(pattern, "");
}

function replaceOnce(
  source: string,
  search: string,
  replacement: string,
  name: string,
) {
  if (source.split(search).length - 1 !== 1) {
    throw new Error(`Homepage shell migration expects one ${name}.`);
  }
  return source.replace(search, replacement);
}

function removeMarkup(source: string): string {
  let result = removeOnce(
    source,
    '<div id="prog" aria-hidden="true"></div>',
    "progress bar",
  );
  result = removeOnce(
    result,
    '<a class="skip" href="#main">Skip to content</a>',
    "skip link",
  );
  result = removeOnce(result, /<header id="hd">[\s\S]*?<\/header>/g, "header");
  result = removeOnce(result, /<footer>[\s\S]*?<\/footer>/g, "footer");
  // The layout already provides the page's single <main> landmark.
  result = replaceOnce(result, '<main id="main">', '<div id="main">', "main");
  return replaceOnce(result, "</main>", "</div>", "main closing tag");
}

/** Drop script lines that drove the removed header, footer and progress bar. */
function removeShellScripts(source: string): string {
  let result = removeOnce(
    source,
    "document.getElementById('yr').textContent = new Date().getFullYear();\n",
    "footer year script",
  );
  result = removeOnce(
    result,
    /function toggleMenu\(b\)\{[^\n]*\}\nfunction closeMenu\(\)\{[^\n]*\n[^\n]*\}\naddEventListener\('keydown',e=>\{if\(e\.key==='Escape'\)closeMenu\(\);\}\);\n/g,
    "mobile menu script",
  );
  result = replaceOnce(
    result,
    "const bar=document.getElementById('prog'),btt=document.getElementById('btt'),hd=document.getElementById('hd');",
    "const btt=document.getElementById('btt');",
    "scroll element lookup",
  );
  result = removeOnce(
    result,
    "  bar.style.transform=`scaleX(${max?h.scrollTop/max:0})`;\n",
    "progress bar script",
  );
  return removeOnce(
    result,
    "  hd.classList.toggle('scrolled',h.scrollTop>8);\n",
    "header scroll script",
  );
}

export function prepareHomepageShell(source: string): string {
  return removeShellScripts(removeMarkup(source));
}
