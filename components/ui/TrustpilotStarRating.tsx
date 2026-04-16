import { cn } from "@/lib/utils";

/** Trustpilot brand green — white star in each square */
const TRUSTPILOT_GREEN = "#00b67a";

function StarGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

type Props = {
  className?: string;
  /** Visual scale */
  size?: "sm" | "md";
};

const sizes = {
  sm: {
    box: "size-[1.375rem] sm:size-6",
    gap: "gap-0.5",
    star: "size-[0.65rem] sm:size-2.5",
  },
  md: {
    box: "size-8 sm:size-9",
    gap: "gap-1",
    star: "size-3.5 sm:size-4",
  },
} as const;

export function TrustpilotStarRating({ className, size = "md" }: Props) {
  const s = sizes[size];
  return (
    <div
      className={cn("flex items-center", s.gap, className)}
      role="img"
      aria-label="5 out of 5 stars"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 items-center justify-center rounded-[2px] shadow-sm",
            s.box,
          )}
          style={{ backgroundColor: TRUSTPILOT_GREEN }}
        >
          <StarGlyph className={cn("text-white", s.star)} />
        </div>
      ))}
    </div>
  );
}
