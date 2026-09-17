"use client";

import Accordion from "@/components/ui/Accordion";
import SectionRail from "@/components/ui/SectionRail";
import SectionTitle from "@/components/ui/SectionTitle";
import { faqs } from "@/content/faq";

export default function Faq() {
  return (
    <section className="relative w-full overflow-hidden bg-panel-alt py-24 md:py-32">
      <div className="premium-grid w-full px-6 md:px-12">
        <SectionRail
          index="12"
          label="FAQ"
          sublabel="Before you write in"
          footnote={`${faqs.length} Questions`}
        />

        <div className="col-span-12 mt-12 md:col-span-8 md:col-start-5 md:mt-0">
          <SectionTitle>QUESTIONS, ANSWERED</SectionTitle>
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
