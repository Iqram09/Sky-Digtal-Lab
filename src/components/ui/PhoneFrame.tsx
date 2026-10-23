import Image from "next/image";
import { cn } from "@/lib/utils";

type PhoneFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

/** A mobile screenshot in a slim device outline. */
export default function PhoneFrame({ src, alt, width, height, className }: PhoneFrameProps) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-[2.2rem] border border-charcoal/20 bg-charcoal p-2 shadow-[0_30px_80px_-40px_rgba(16,16,20,0.8)]",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-[1.7rem]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 70vw, 300px"
          className="h-auto w-full"
        />
      </div>
    </figure>
  );
}
