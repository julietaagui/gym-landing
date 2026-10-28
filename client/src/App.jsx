import { useEffect } from "react";
import Lenis from "lenis";
import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Problems } from "./components/Problems";
import { Features } from "./components/Features";
import { Roles } from "./components/Roles";
import { Benefits } from "./components/Benefits";
import { DesignPrinciples } from "./components/DesignPrinciples";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
    });

    return () => lenis.destroy();
  }, []);

  return (
    <main className="landing">
      <Header />
      <Hero />
      <Problems />
      <Features />
      <Roles />
      <Benefits />
      <DesignPrinciples />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
