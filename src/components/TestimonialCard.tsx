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
    <div className="testimonial-card">
      <div className="flex items-start gap-6">
        <div className="avatar-circle w-16 h-16 bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white font-bold text-xl flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="mb-4 italic text-muted-foreground">"{quote}"</p>
          <h4 className="font-bold gradient-text">{name}</h4>
          <p className="text-muted-foreground text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
}
