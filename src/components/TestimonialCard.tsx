interface TestimonialCardProps {
  initials: string;
  name: string;
  role: string;
  quote: string;
}

export default function TestimonialCard({
  initials,
  name,
  role,
  quote,
}: TestimonialCardProps) {
  return (
    <div className="bg-[var(--bg-tertiary)] rounded-2xl p-8 flex items-center gap-6">
      <div className="w-20 h-20 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold text-2xl">
        {initials}
      </div>
      <div>
        <p className="mb-4 italic">"{quote}"</p>
        <h4 className="font-bold text-[var(--accent)]">{name}</h4>
        <p>{role}</p>
      </div>
    </div>
  );
}
