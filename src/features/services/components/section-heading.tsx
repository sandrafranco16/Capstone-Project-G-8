import type { SectionHeadingProps } from "../services.types";
export function SectionHeading({
  id,
  title,
  eyebrow,
  description,
}: SectionHeadingProps) {
  return (
    <>
      {eyebrow && <p className="svc-num">{eyebrow}</p>}
      <h2 id={id} className="display">
        {title}
      </h2>
      {description && <p className="lead">{description}</p>}
    </>
  );
}
