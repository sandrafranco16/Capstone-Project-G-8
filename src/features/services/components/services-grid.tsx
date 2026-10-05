import type { ServiceOffer } from "../services.types";
import { ServiceCard } from "./service-card";
export function ServicesGrid({ offers }: { offers: readonly ServiceOffer[] }) {
  return (
    <ul className="offer">
      {offers.map((offer) => (
        <ServiceCard key={offer.title} offer={offer} />
      ))}
    </ul>
  );
}
