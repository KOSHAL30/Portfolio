import Navigation from "@/components/ui/Navigation";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative">
      <Navigation />
      <Hero />
      <Services />
      <Projects />
      <Process />
      <Contact />
    </main>
  );
}
