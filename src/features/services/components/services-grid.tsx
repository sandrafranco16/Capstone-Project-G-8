import type { CardTone } from "@/lib/card-tones";

import type { ServiceOffer } from "../services.types";
import { ServiceCard } from "./service-card";
export function ServicesGrid({
  offers,
  tones,
}: {
  offers: readonly ServiceOffer[];
  tones?: readonly CardTone[];
}) {
  return (
    <ul className="offer">
      {offers.map((offer, index) => (
        <ServiceCard
          key={offer.title}
          offer={offer}
          cardTone={tones?.[index % tones.length]}
        />
      ))}
    </ul>
  );
}
