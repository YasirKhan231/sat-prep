import Link from "next/link";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="feature-card">
      <div className="text-[var(--accent)] text-5xl mb-6">
        <i className={`fas fa-${icon}`}></i>
      </div>
      <h3 className="text-2xl text-[var(--accent)] mb-4">{title}</h3>
      <p className="mb-6">{description}</p>
      <Link href="#" className="btn btn-primary px-4 py-2 mt-4 text-sm">
        Explore Feature
      </Link>
    </div>
  );
}
