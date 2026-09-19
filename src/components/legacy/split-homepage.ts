/**
 * A deliberately narrow bridge for the approved local homepage, not an HTML parser.
 * Keep complete main/section boundaries so raw HTML never straddles React nodes.
 * Fail the build if the prototype structure changes instead of duplicating content.
 */
function extractMain(markup: string) {
  const main = markup.match(
    /^([\s\S]*?)<main id="main">([\s\S]*?)<\/main>([\s\S]*)$/,
  );
  if (!main || (markup.match(/<main\b/g) ?? []).length !== 1) {
    throw new Error(
      'Homepage migration requires exactly one <main id="main">.',
    );
  }

  const [, beforeMain, content, afterMain] = main;
  return { beforeMain, content, afterMain };
}

function findFlagshipSection(markup: string, content: string) {
  const section = content.match(
    /<section class="section" id="flagship">[\s\S]*?<\/section>/,
  );
  if (
    !section ||
    (markup.match(/\bid=["']flagship["']/g) ?? []).length !== 1 ||
    (section[0].match(/<section\b/g) ?? []).length !== 1
  ) {
    throw new Error(
      "Homepage migration requires exactly one non-nested flagship section.",
    );
  }

  return section;
}

export function splitHomepage(markup: string) {
  const { beforeMain, content, afterMain } = extractMain(markup);
  const section = findFlagshipSection(markup, content);
  const start = section.index!;
  return {
    beforeMain,
    beforeFlagship: content.slice(0, start),
    afterFlagship: content.slice(start + section[0].length),
    afterMain,
  };
}
