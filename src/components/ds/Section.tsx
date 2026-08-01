import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
  label,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn("relative w-full px-5 py-24 sm:px-8 md:py-32", className)}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-[11px] font-medium tracking-[0.22em] text-muted-foreground uppercase backdrop-blur-md transition-colors duration-300 hover:border-gold/50 hover:text-gold",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-gold shadow-[0_0_12px_var(--gold)]" />
      {children}
    </span>
  );
}

export function Heading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "text-balance text-4xl leading-[0.95] font-semibold sm:text-5xl md:text-6xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg", className)}>
      {children}
    </p>
  );
}
