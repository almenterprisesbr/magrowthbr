import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { useState, type ComponentProps, type MouseEvent } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full text-sm font-semibold tracking-tight transition-all duration-300 ease-[var(--ease-lux)] disabled:pointer-events-none disabled:opacity-55 active:scale-[0.97] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        gold: "bg-[image:var(--gradient-gold)] text-primary-foreground shadow-[var(--shadow-gold)] hover:brightness-110 hover:shadow-[0_24px_60px_-16px_color-mix(in_oklab,var(--gold)_60%,transparent)]",
        outline:
          "border border-border bg-transparent text-foreground hover:border-gold/60 hover:bg-accent/60 hover:text-accent-foreground",
        ghost: "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
      },
      size: {
        sm: "h-10 px-5",
        md: "h-12 px-7",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

type Ripple = { id: number; x: number; y: number };

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean; loading?: boolean };

export function Button({
  className,
  variant,
  size,
  asChild,
  loading,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const Comp = asChild ? Slot : "button";

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((item) => item.id !== id)), 650);
    onClick?.(e);
  };

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      onClick={handleClick}
      aria-busy={loading || undefined}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading ? (
            <span
              aria-hidden
              className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
          ) : null}
          {children}
          {ripples.map((r) => (
            <span
              key={r.id}
              aria-hidden
              style={{ left: r.x, top: r.y }}
              className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 animate-[pulse-ring_0.6s_ease-out] rounded-full bg-current/30"
            />
          ))}
        </>
      )}
    </Comp>
  );
}

export { buttonVariants };
