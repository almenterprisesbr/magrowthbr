import logoAsset from "@/assets/ma-growth-logo.png.asset.json";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "mark",
}: {
  className?: string;
  variant?: "mark" | "full";
}) {
  if (variant === "full") {
    return (
      <img
        src={logoAsset.url}
        alt="MA Growth Marketing"
        loading="lazy"
        className={cn("h-10 w-auto object-contain", className)}
      />
    );
  }

  return (
    <span
      className={cn(
        "grid size-8 shrink-0 place-items-center overflow-hidden rounded-xl bg-background ring-1 ring-brand/40",
        className,
      )}
    >
      <img
        src={logoAsset.url}
        alt="MA Growth"
        loading="lazy"
        className="size-full scale-[1.35] object-contain object-center"
        style={{ clipPath: "inset(12% 8% 30% 8%)" }}
      />
    </span>
  );
}
