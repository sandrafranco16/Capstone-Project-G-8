/** Only accepts markup from the trusted, checked-in demo loader. */
export function LegacyMarkup({ markup }: { markup: string }) {
  return (
    <div
      className="legacy-demo-document"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
