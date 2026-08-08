import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
  aspectRatio?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  className,
  aspectRatio = "aspect-square",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = clientX - left;
    const newPosition = Math.min(Math.max((x / width) * 100, 0), 100);
    setPosition(newPosition);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return; // Only when left mouse button is pressed
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    handleMove(touch.clientX);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl cursor-ew-resize select-none group",
        aspectRatio,
        className
      )}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={(e) => handleMove(e.clientX)}
    >
      {/* Before Image (Bottom) */}
      <img
        src={beforeImage}
        alt="Antes"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      
      {/* Before Label */}
      <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
        ANTES
      </div>

      {/* After Image (Top, Clipped) */}
      <img
        src={afterImage}
        alt="Depois"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        draggable={false}
      />

      {/* After Label */}
      <div 
        className="absolute top-4 right-4 rounded-full bg-brand/80 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm"
        style={{ opacity: position < 80 ? 1 : 0, transition: 'opacity 0.2s' }}
      >
        DEPOIS
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10"
        style={{ left: `calc(${position}% - 2px)` }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
          <div className="flex gap-1">
            <div className="h-3 w-0.5 rounded-full bg-muted-foreground/40" />
            <div className="h-3 w-0.5 rounded-full bg-muted-foreground/40" />
          </div>
        </div>
      </div>

      {/* Invisible Range Input for accessibility and easier mobile handling */}
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 z-20 h-full w-full opacity-0 cursor-ew-resize"
        aria-label="Controle de visualização antes e depois"
      />
    </div>
  );
}
