interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  ctaText: string;
}

export default function PricingCard({
  title,
  price,
  features,
  ctaText,
}: PricingCardProps) {
  return (
    <div className="pricing-card">
      <h3 className="text-xl text-[var(--accent)] mb-4">{title}</h3>
      <p className="text-3xl font-bold mb-6">{price}</p>
      <ul className="mb-8">
        {features.map((feature, index) => (
          <li key={index} className="mb-3 text-[var(--text-secondary)]">
            {feature}
          </li>
        ))}
      </ul>
      <button className="btn btn-primary w-full">{ctaText}</button>
    </div>
  );
}
