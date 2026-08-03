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
        className={cn("h-12 w-auto object-contain", className)}
      />
    );
  }

  // Crop the uploaded logo down to just the "MA" symbol.
  return (
    <span
      aria-hidden
      className={cn("relative block h-8 w-[78px] shrink-0 overflow-hidden", className)}
    >
      <img
        src={logoAsset.url}
        alt=""
        loading="lazy"
        className="absolute top-0 left-0 h-auto w-[143%] max-w-none -translate-x-[24%] -translate-y-[48%]"
      />
    </span>
  );
}
