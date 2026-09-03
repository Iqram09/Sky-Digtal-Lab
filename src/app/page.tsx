import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Capabilities from "@/components/sections/Capabilities";
import Showcase from "@/components/sections/Showcase";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Manifesto />
      <Capabilities />
      <Showcase />
      <Footer />
    </main>
  );
}
