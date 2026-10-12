import Image from "next/image";
import { cn } from "@/lib/utils";

type BrowserFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Address shown in the toolbar — the real domain of the site. */
  url: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  caption?: string;
};

/**
 * A screenshot in minimal browser chrome. The toolbar is decorative; the image
 * carries the description.
 */
export default function BrowserFrame({
  src,
  alt,
  width,
  height,
  url,
  sizes,
  priority,
  className,
  imageClassName,
  caption,
}: BrowserFrameProps) {
  const frame = (
    <div
      className={cn(
        "overflow-hidden rounded-[10px] border border-foreground/12 bg-ink shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      <div aria-hidden className="flex items-center gap-3 border-b border-foreground/10 px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-foreground/20" />
          <span className="h-2 w-2 rounded-full bg-foreground/20" />
          <span className="h-2 w-2 rounded-full bg-foreground/20" />
        </span>
        <span className="mx-auto max-w-[60%] truncate rounded-full bg-foreground/[0.06] px-4 py-1 font-mono text-[10px] tracking-wider text-subtle">
          {url}
        </span>
        <span className="w-[42px]" />
      </div>
      <div className="relative overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className={cn("h-auto w-full", imageClassName)}
        />
      </div>
    </div>
  );

  if (!caption) return frame;

  return (
    <figure>
      {frame}
      <figcaption className="mt-4 max-w-xl font-mono text-[11px] leading-relaxed tracking-wide text-subtle">
        {caption}
      </figcaption>
    </figure>
  );
}
