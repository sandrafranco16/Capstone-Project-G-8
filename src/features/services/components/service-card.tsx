import type { CardTone } from "@/lib/card-tones";

import type { ServiceOffer } from "../services.types";
export function ServiceCard({
  offer,
  cardTone,
}: {
  offer: ServiceOffer;
  cardTone?: CardTone;
}) {
  return (
    <li
      className="card fill off rv"
      data-tone={offer.tone}
      data-card-tone={cardTone}
    >
      <h3>{offer.title}</h3>
      <p>{offer.description}</p>
    </li>
  );
}
