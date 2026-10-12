import type { Metadata } from "next";
import Hero from "@/components/sections/home/Hero";
import Intro from "@/components/sections/home/Intro";
import SelectedWork from "@/components/sections/home/SelectedWork";
import ServicesOverview from "@/components/sections/home/ServicesOverview";
import Mission from "@/components/sections/home/Mission";
import Brands from "@/components/sections/home/Brands";
import TeamPreview from "@/components/sections/home/TeamPreview";
import Process from "@/components/sections/Process";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Intro />
      <SelectedWork />
      <ServicesOverview />
      <Mission />
      <Brands />
      <TeamPreview />
      <Process />
      <CtaBand />
    </main>
  );
}
