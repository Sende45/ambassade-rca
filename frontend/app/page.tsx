import Hero from "./components/Hero";
import ServicesConsulaires from "./components/ServicesConsulaires";
import Actualites from "./components/Actualites";
import Reveal from "./components/motion/Reveal";

export default function Accueil() {
  return (
    <main>
      <Hero />
      <ServicesConsulaires />
      <Reveal>
        <Actualites />
      </Reveal>
    </main>
  );
}