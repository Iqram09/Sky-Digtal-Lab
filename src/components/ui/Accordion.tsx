"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

/**
 * Accessible disclosure list: each trigger is a real button wired to its panel
 * with aria-expanded / aria-controls. Closed panels stay in the HTML (inert),
 * so every answer is crawlable and matches the page's FAQ structured data.
 */
export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="border-t border-foreground/15">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-trigger-${index}`;

        return (
          <div key={item.question} className="border-b border-foreground/15">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
              >
                <span
                  className={cn(
                    "font-display text-xl font-semibold tracking-tight transition-colors md:text-2xl",
                    isOpen ? "text-foreground" : "text-muted group-hover:text-foreground"
                  )}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "relative h-4 w-4 shrink-0 transition-colors",
                    isOpen ? "text-foreground" : "text-subtle group-hover:text-foreground"
                  )}
                >
                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                  <span
                    className={cn(
                      "absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current transition-transform duration-300 motion-reduce:transition-none",
                      isOpen ? "scale-y-0" : "scale-y-100"
                    )}
                  />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-8 text-base leading-relaxed text-muted md:text-lg">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
