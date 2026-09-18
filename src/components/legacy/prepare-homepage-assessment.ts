/** A narrow adapter for the checked-in prototype; demo/index.html stays intact. */
export function prepareHomepageAssessment(source: string): string {
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
