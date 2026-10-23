import Image from "next/image";
import type { Project } from "@/content/projects";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type GalleryItem = Project["gallery"][number];

/** Full-width items stand alone; everything else pairs up two to a row. */
function toRows(items: GalleryItem[]) {
  const rows: GalleryItem[][] = [];
  let pending: GalleryItem | null = null;
  for (const item of items) {
    if (item.layout === "wide") {
      if (pending) rows.push([pending]);
      pending = null;
      rows.push([item]);
    } else if (pending) {
      rows.push([pending, item]);
      pending = null;
    } else {
      pending = item;
    }
  }
  if (pending) rows.push([pending]);
  return rows;
}

const isScreenshot = (item: GalleryItem) => item.width === 1920 && item.height === 1200;

function GalleryFigure({ item, url, sizes }: { item: GalleryItem; url: string; sizes: string }) {
  if (isScreenshot(item)) {
    return (
      <BrowserFrame
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        url={url}
        sizes={sizes}
        caption={item.caption}
      />
    );
  }

  return (
    <figure>
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        sizes={sizes}
        className="h-auto w-full rounded-[12px] border border-foreground/10"
      />
      {item.caption ? (
        <figcaption className="mt-4 max-w-xl text-sm leading-relaxed text-subtle">
          {item.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function CaseGallery({ project }: { project: Project }) {
  const rows = toRows(project.gallery);

  return (
    <div className="flex flex-col gap-14 md:gap-20">
      {rows.map((row, rowIndex) => {
        if (row.length === 1) {
          const [item] = row;
          return (
            <Reveal key={item.src} className={cn(item.layout !== "wide" && "md:mx-auto md:w-2/3")}>
              <GalleryFigure item={item} url={project.displayUrl} sizes="(max-width: 768px) 92vw, 88vw" />
            </Reveal>
          );
        }

        const [first, second] = row;
        // A portrait photo beside a landscape screenshot takes the narrower column.
        const firstNarrow = first.layout === "tall" && second.layout !== "tall";
        const secondNarrow = second.layout === "tall" && first.layout !== "tall";

        return (
          <div key={`${rowIndex}-${first.src}`} className="grid items-center gap-14 md:grid-cols-12 md:gap-10">
            <Reveal className={cn("md:col-span-6", firstNarrow && "md:col-span-5", secondNarrow && "md:col-span-7")}>
              <GalleryFigure item={first} url={project.displayUrl} sizes="(max-width: 768px) 92vw, 46vw" />
            </Reveal>
            <Reveal delay={0.08} className={cn("md:col-span-6", secondNarrow && "md:col-span-5", firstNarrow && "md:col-span-7")}>
              <GalleryFigure item={second} url={project.displayUrl} sizes="(max-width: 768px) 92vw, 46vw" />
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}
