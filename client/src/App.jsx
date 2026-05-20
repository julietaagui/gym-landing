import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Problems } from "./components/Problems";
import { Features } from "./components/Features";
import { Benefits } from "./components/Benefits";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
    <main className="landing">
      <Header />
      <Hero />
      <Problems />
      <Features />
      <Benefits />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
