import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Services from "@/components/sections/Services";
import Principles from "@/components/sections/Principles";
import Showcase from "@/components/sections/Showcase";
import Problems from "@/components/sections/Problems";
import Process from "@/components/sections/Process";
import Technology from "@/components/sections/Technology";
import Clients from "@/components/sections/Clients";
import IdeaToInfrastructure from "@/components/sections/IdeaToInfrastructure";
import Quality from "@/components/sections/Quality";
import About from "@/components/sections/About";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <main id="main" className="flex min-h-screen flex-col items-center justify-between">
        <Hero />
        <Manifesto />
        <Services />
        <Principles />
        <Showcase />
        <Problems />
        <Process />
        <Technology />
        <Clients />
        <IdeaToInfrastructure />
        <Quality />
        <About />
        <Faq />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
