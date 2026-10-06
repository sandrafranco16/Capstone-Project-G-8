import { cn } from "@/lib/cn";
import { getInitials } from "@/lib/initials";

import {
  testimonials as defaultTestimonials,
  type Testimonial,
} from "./leadership-content";
import { TestimonialsRail } from "./testimonials-rail";
import styles from "./testimonials-section.module.css";

type TestimonialsSectionProps = {
  testimonials?: readonly Testimonial[];
};

/** Participant quotes in a swipeable rail; renders nothing when there are none. */
export function TestimonialsSection({
  testimonials = defaultTestimonials,
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className={styles.section}
    >
      <div className={styles.wrap}>
        <TestimonialsRail
          label="Client testimonials"
          header={
            <div>
              <p className={styles.label}>Client testimonials</p>
              <h2 id="testimonials-heading" className={styles.title}>
                What participants told us.
              </h2>
            </div>
          }
        >
          {testimonials.map((testimonial) => (
            <li key={testimonial.id}>
              <figure className={cn(styles.quote, styles[testimonial.theme])}>
                <span className={styles.mark} aria-hidden="true">
                  <QuoteIcon />
                </span>
                <blockquote>
                  <p>{testimonial.quote}</p>
                </blockquote>
                <figcaption>
                  <span className={styles.avatar} aria-hidden="true">
                    {getInitials(testimonial.author)}
                  </span>
                  <span>
                    <span className={styles.author}>{testimonial.author}</span>
                    <span className={styles.role}>{testimonial.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </TestimonialsRail>
      </div>
    </section>
  );
}

function QuoteIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M9.5 5C6 6.4 3.5 9.6 3.5 13.6V19h6v-6h-3c0-2.6 1.4-4.7 3.9-5.8L9.5 5Zm11 0c-3.5 1.4-6 4.6-6 8.6V19h6v-6h-3c0-2.6 1.4-4.7 3.9-5.8L20.5 5Z" />
    </svg>
  );
}
