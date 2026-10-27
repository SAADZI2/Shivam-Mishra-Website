import { Star } from "./icons";

export default function Stars({ count = 5, className = "w-4 h-4" }: { count?: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-gold" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className={`${className} fill-current`} />
      ))}
    </span>
  );
}
