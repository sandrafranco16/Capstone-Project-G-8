import type { ServiceOffer } from "../services.types";
export function ServiceCard({ offer }: { offer: ServiceOffer }) {
  return (
    <li className="card fill off rv" data-tone={offer.tone}>
      <h3>{offer.title}</h3>
      <p>{offer.description}</p>
    </li>
  );
}
