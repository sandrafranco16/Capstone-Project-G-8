/** A narrow adapter for the checked-in prototype; demo/index.html stays intact. */
function linkPathwayCards(source: string): string {
  const cards = [
    ...source.matchAll(
      /<button\b([^>]*\bdata-path="(career|learn|govern|risk)"[^>]*)>([\s\S]*?)<\/button>/g,
    ),
  ];
  if (cards.length !== 4 || new Set(cards.map((card) => card[2])).size !== 4) {
    throw new Error("Assessment migration requires four unique pathway cards.");
  }

  let result = source;
  for (const [card, attributes, path, content] of cards) {
    const linkAttributes = attributes
      .replace(/\s+type="button"/, "")
      .replace(/\s+aria-pressed="false"/, "")
      .replace(/\s+onclick="choosePath\(this\)"/, "");
    result = result.replace(
      card,
      `<a href="/assessment?path=${path}"${linkAttributes}>${content}</a>`,
    );
  }

  return result;
}

function replaceAssessmentSection(result: string): string {
  const section =
    /<section class="section assess-wrap" id="assess">[\s\S]*?<\/section>/g;
  const sections = [...result.matchAll(section)];
  if (
    sections.length !== 1 ||
    (sections[0][0].match(/<section\b/g) ?? []).length !== 1
  ) {
    throw new Error(
      "Assessment migration requires one non-nested assessment section.",
    );
  }
  result = result.replace(
    section,
    `<section class="section assess-wrap" id="assess">
  <div class="wrap assess-grid">
    <div>
      <p class="label c-blue">Step two</p>
      <h2 class="display big">Five questions. Your next step.</h2>
      <p class="lead">Explore questions for your career, learning, governance or risk pathway. Your answers and result are not saved or sent.</p>
    </div>
    <div>
      <h3>Where will you start?</h3>
      <p>Choose a pathway and get relevant service recommendations.</p>
      <p>Preview for feedback — content and scoring await client confirmation.</p>
      <a class="btn btn-coral" href="/assessment"><span>Start the AI readiness assessment</span></a>
    </div>
  </div>
</section>`,
  );

  return result;
}

function removeLegacyQuiz(result: string): string {
  // Remove the old quiz as a whole, before scripts are extracted by the loader.
  // Other homepage interactions and the governance slot are left in place.
  const scriptBlock =
    /\/\* ============ pathway → assessment ============[\s\S]*?(?=\/\* ============ booking ============)/g;
  if ([...result.matchAll(scriptBlock)].length !== 1) {
    throw new Error(
      "Assessment migration requires one bounded legacy quiz script.",
    );
  }
  return result.replace(scriptBlock, "");
}

function promotePathwayLanding(result: string): string {
  // Client feedback: the four pathways are the front door, before governance.
  const hero = result.match(/<section class="hero">[\s\S]*?<\/section>/g);
  const pathways = result.match(
    /<section class="section" id="pathways">[\s\S]*?<\/section>/g,
  );
  if (
    hero?.length !== 1 ||
    pathways?.length !== 1 ||
    (hero[0].match(/<section\b/g) ?? []).length !== 1 ||
    (pathways[0].match(/<section\b/g) ?? []).length !== 1
  ) {
    throw new Error(
      "Assessment migration requires one hero and one non-nested pathway section.",
    );
  }
  const landing = pathways[0]
    .replace('class="section"', 'class="section pathway-landing"')
    .replace(
      '<p class="label c-blue">Step one</p>',
      '<p class="label c-blue">Four pathways. Your next step.</p>',
    )
    .replace(
      '<h2 class="display big">Start where you are.</h2>',
      '<h1 class="display big">Find your next step with AI.</h1>',
    )
    .replace(
      "Pick the path that fits you. It sets up your assessment and the recommendations that follow.",
      "Build your career, learn practical AI, strengthen governance or prepare for risk. Choose your pathway for a short assessment and relevant services.",
    )
    .replace(/<div class="rail-nav">[\s\S]*?<\/div>/, "")
    .replaceAll(' rv"', '"')
    .replaceAll("--ac:#B4770B;", "--ac:#875B09;");
  return result.replace(pathways[0], "").replace(hero[0], landing);
}

function addLandingStyles(result: string): string {
  // Show all four choices rather than hiding any in the prototype's swipe rail.
  const landingStyles = `
    .pathway-landing { background: var(--mist); padding-block: clamp(36px, 5vw, 72px); }
    .pathway-landing h1 { font-size: clamp(2.2rem, 4.5vw, 4.4rem); max-width: 20ch; }
    .pathway-landing .rail { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); grid-auto-flow: row; grid-auto-columns: auto; overflow: visible; margin: 0; padding: 4px; }
    .pathway-landing .path { width: auto; min-width: 0; padding: 24px 20px; }
    .pathway-landing .path:focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; }
    @media (max-width: 1000px) { .pathway-landing .rail { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 600px) { .pathway-landing .rail { grid-template-columns: 1fr; } }
  `;
  return result.replace("</head>", `<style>${landingStyles}</style></head>`);
}

/** Apply each checked migration step in order; fail on unexpected boundaries. */
export function prepareHomepageAssessment(source: string): string {
  const linked = linkPathwayCards(source);
  const invitation = replaceAssessmentSection(linked);
  const withoutQuiz = removeLegacyQuiz(invitation);
  const landing = promotePathwayLanding(withoutQuiz);
  return addLandingStyles(landing);
}
