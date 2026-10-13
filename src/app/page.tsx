import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import AgeCounter from "@/components/AgeCounter";
import Services from "@/components/Services";
import Marca from "@/components/Marca";
import Diagnostic from "@/components/Diagnostic";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <AgeCounter />
        <Services />
        <Marca />
        <Diagnostic />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
