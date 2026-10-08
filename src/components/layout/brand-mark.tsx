import { useId } from "react";

type BrandMarkProps = {
  /** White ring and coral dot, for dark backgrounds such as the footer. */
  onDark?: boolean;
  className?: string;
};

/** The dot-and-ring "o" in the "bitd•t" wordmark, from the approved prototype. */
export function BrandMark({ onDark = false, className }: BrandMarkProps) {
  const gradientId = useId();

  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      {!onDark && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#0057B8" />
            <stop offset="1" stopColor="#2E96FF" />
          </linearGradient>
        </defs>
      )}
      <circle
        cx="29"
        cy="37"
        r="19"
        fill="none"
        stroke={onDark ? "#fff" : `url(#${gradientId})`}
        strokeWidth="9"
      />
      <circle cx="48" cy="14" r="9" fill={onDark ? "#FF9E7A" : "#2E96FF"} />
    </svg>
  );
}
